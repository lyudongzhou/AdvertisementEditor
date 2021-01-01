<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div id="main" ref="chart" :style="getSize"></div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';
let echarts = require('echarts');

export default {
  name: 'pieChartCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
      // myChart: echarts.init(this.$refs.chart),
    }
  },
  computed: {
    getSize () {
      return `width:${this.cmpConfig.layoutConfig.widht}px;
              height:${this.cmpConfig.layoutConfig.height}px`;
    },
    option () {
      let option = this.cmpConfig.props;
      Object.assign(option, {grid: {
        width: this.cmpConfig.layoutConfig.width,
        height: this.cmpConfig.layoutConfig.height,
      }});
      return option;
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.myChart.setOption(this.option);
  },
  methods: {
  },
  watch: {
    // 图例
    'option.legend.show' () {
      this.myChart.setOption(this.option);
    },
  }
}
</script>

<style lang="less" scoped>
</style>
