<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="warp" :style="getStyle">
      <span>{{nowTime}}</span>
    </div>
  </baseCmp>
</template>

<script>
// import {getPropByPath} from '@/utils';
import baseCmp from '../../Base.vue';

export default {
  name: 'weekCmp',
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
          W = "周日";
          break;
        case 1:
          W = "周一";
          break;
        case 2:
          W = "周二";
          break;
        case 3:
          W = "周三";
          break;
        case 4:
          W = "周四";
          break;
        case 5:
          W = "周五";
          break;
        case 6:
          W = "周六";
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
