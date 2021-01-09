<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div id="main" ref="chart" :style="getSize"></div>
  </baseCmp>
</template>

<script>
import {getPropByPath} from '@/utils';
import baseCmp from '../../Base.vue';
let echarts = require('echarts');

export default {
  name: 'weekCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  computed: {
    getSize () {
      return `width:${this.cmpConfig.layoutConfig.width}px;
              height:${this.cmpConfig.layoutConfig.height}px`;
    },
    switchShow () {
      return getPropByPath(this.cmpConfig, 'props.legend.show');
    },
    chartTHData () {
      return getPropByPath(this.cmpConfig, 'props.series');
    },
    chartTDData () {
      return getPropByPath(this.cmpConfig, 'props.xAxis.data');
    },
    option: {
      get () {
        let option = this.cmpConfig.props;
        return option;
      },
      set () {
        this.myChart.setOption(this.option);
      }
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.myChart.setOption(this.option);
  },
  watch: {
    // 图例
    switchShow () {
      this.myChart.setOption(this.option);
    },
    chartTHData () {
      this.myChart.setOption(this.option);
    },
    chartTDData () {
      this.myChart.setOption(this.option);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
