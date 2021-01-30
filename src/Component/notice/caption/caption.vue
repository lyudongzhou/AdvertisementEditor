<template lang="html">
  <baseCmp :cmpConfig="cmpConfig" :style="getLocation">
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
    getLocation () {
      let style = {};
      Object.keys(this.cmpConfig.props).forEach(key => {
        if (key === 'location') {
          style['top'] = '';
          style['bottom'] = '';
          style['left'] = '';
          style['right'] = '';
          switch (this.cmpConfig.props[key]) {
            case '居中':
              style['top'] = '50%';
              break;
            case '底部':
              style['bottom'] = '0px';
              break;
            default:
              style['top'] = '0px';
          }
        }
      })
      return style;
    },
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
    this.marquee();
  },
  methods: {
    marquee () {
      let warp = this.$refs.marquee,
          content = this.$refs.text;
      this._timer = TweenMax.to(content, 3, {
        left: this.cmpConfig.props.direction==='从右往左'?-content.offsetWidth:warp.offsetWidth,
        ease: 'linear',
        onComplete: () => {
          content.style.left = this.cmpConfig.props.direction==='从右往左'?warp.offsetWidth+'px':'0px';
          setTimeout(() => {
            this._timer.kill();
            this.marquee();
          })
        }
      })
    }
  },
  destroyed () {
    this._timer.kill();
  },
  watch: {
    'cmpConfig.props.direction': {
      handler () {
        this._timer.kill();
        let warp = this.$refs.marquee,
            content = this.$refs.text;
        content.style.left = this.cmpConfig.props.direction==='从右往左'?warp.offsetWidth+'px':'0px';
        this.marquee();
      }
    }
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
