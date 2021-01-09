<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div id="main" ref="chart" :style="getSize"></div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';
import { getPropByPath } from "@/utils";
let echarts = require('echarts');

export default {
  name: 'weekdayCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
    }
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
      return getPropByPath(this.cmpConfig, 'props.series[0].data');
    },
    option: {
      get () {
        let option = this.cmpConfig.props;
        // Object.assign(option, {grid: {
        //   width: this.cmpConfig.layoutConfig.width,
        //   height: this.cmpConfig.layoutConfig.height,
        // }});
        return option;
      },
      set () {
        this.myChart.setOption(this.option);
      }
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
    switchShow () {
      this.myChart.setOption(this.option);
    },
    chartTHData () {
      this.myChart.setOption(this.option);
    },
  }
}
</script>

<style lang="less" scoped>
</style>
