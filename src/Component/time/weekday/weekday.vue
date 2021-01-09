<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="warp" :style="getStyle">
      <span>{{nowTime}}</span>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';

export default {
  name: 'weekdayCmp',
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
      let W = data.getDay();
      switch (W) {
        case 0:
          W = "星期日";
          break;
        case 1:
          W = "星期一";
          break;
        case 2:
          W = "星期二";
          break;
        case 3:
          W = "星期三";
          break;
        case 4:
          W = "星期四";
          break;
        case 5:
          W = "星期五";
          break;
        case 6:
          W = "星期六";
          break;
        default:
          break;
      }
      this.nowTime = W;
    },
  },
  destroyed() {},
  watch: {},
}
</script>

<style lang="less" scoped>
</style>
