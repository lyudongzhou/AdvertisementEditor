<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div id="main" ref="chart" :style="getSize"></div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';
let echarts = require('echarts');

export default {
  name: 'lineChartCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  computed: {
    getSize () {
      return `width:${this.cmpConfig.layoutConfig.width}px;
              height:${this.cmpConfig.layoutConfig.height}px`;
    }
  },
  mounted() {
    let myChart = echarts.init(this.$refs.chart);
    let option = this.cmpConfig.props;
    Object.assign(option, {grid: {
      width: this.cmpConfig.layoutConfig.width,
      height: this.cmpConfig.layoutConfig.height,
    }});
    myChart.setOption(option);
  },
}
</script>

<style lang="less" scoped>
</style>
