<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="warp" ref="marquee" :style="getStyle">
        <span ref="text">{{cmpConfig.props.text}}</span>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';
import { TweenMax } from "gsap";

export default {
  name: 'captionCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
    }
  },
  computed: {
    getStyle () {
      let style = {};
      Object.keys(this.cmpConfig.props).forEach(key => {
        switch (key) {
          case 'font-size':
            style[key] = this.cmpConfig.props[key]+'px'
            break;
          case 'width':
            style[key] = this.cmpConfig.layoutConfig[key]+'px'
            break;
          case 'height':
            style[key] = this.cmpConfig.layoutConfig[key]+'px'
            break;
          default:
            style[key] = this.cmpConfig.props[key]
        }
      })
      return style;
    },
  },
  mounted() {
    let warp = this.$refs.marquee,
        content = this.$refs.text;
    let marquee = () => {
      this._timer = TweenMax.to(content, this.cmpConfig.props.text.length*(warp.offsetWidth/100), {
        left: -content.offsetWidth,
        ease: 'linear',
        onComplete: () => {
          content.style.left = warp.offsetWidth+'px';
          setTimeout(() => {
            marquee();
          })
        }
      })
    }
    marquee();
  },
  methods: {
  },
  destroyed () {
    this._timer.kill();
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
  .warp{
    position: relative;
    >span {
      position: absolute;
      white-space: nowrap;
    }
  }
</style>
