<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="warp" :style="getStyle">
      <span>{{cmpConfig.props.text}}</span>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';

export default {
  name: 'dateCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
      nowTime: '',
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
    }
  },
  mounted() {
    this.dealWithTime(new Date());
  },
  methods: {
    dealWithTime (data) {
      let Y = data.getFullYear();
      let M = data.getMonth()+1;
      let D = data.getDate();
      M = M<10?`0${M}`:M;
      D = D<10?`0${D}`:D;
      this.cmpConfig.props.text = `${Y}-${M}-${D}`;
    },
  },
  destroyed () {},
  watch: {},
}
</script>

<style lang="less" scoped>
</style>
