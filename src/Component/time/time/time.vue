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
  name: 'timeCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
      time: '',
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
    this.timer = setInterval(()=> {
      this.dealWithTime(new Date()) // 修改数据date
    }, 1000)
  },
  methods: {
    dealWithTime (data) {
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      this.nowTime = `${H}:${Min}:${S}`;
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  watch: {},
}
</script>

<style lang="less" scoped>
</style>
