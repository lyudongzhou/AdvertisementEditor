<template>
  <div class="chart_tab">
    <div>
      <div :class="{'hide_legend':!configData.props.legend.show}" class="show_legend">
        <span>提示图例</span>
        <button @click="switchLegend">{{configData.props.legend.show?'ON':'OFF'}}</button>
      </div>
      <div class="chart_operation">
        <p>图表数据</p>
        <button @click="editData">编辑数据</button>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../editors';
  import { get } from '@/register';
  import { REG_EDITORS } from '@/const';
  // import { getPropByPath } from "@/utils";
  import { mapMutations } from "../../../../store";
  import {
    BEFORE_UPDATE_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
  } from "../../../../constant/schema";

  export default {
    name: 'chartTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    data() {
      return {
        show: true,
        thData: null,
        tdData: null,
      }
    },
    mounted () {
      this.$event.on('CORRECTCHARTWINDOW', (th,td)=>{
        this.changeChartData(BEFORE_UPDATE_COMPONENT_PROPS,this.thData,this.tdData);
        this.changeChartData(AFTER_UPDATE_COMPONENT_PROPS,th,td);
      });
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      changeSwitch (type) {
        this.updateSchema({
          type: type,
          value: {
            [this.config.target.switch]: this.show,
          },
        });
      },
      changeChartData (type,th,td) {
        this.updateSchema({
          type: type,
          value: {
            [this.config.target.data.th]: th,
            [this.config.target.data.td]: td,
          },
        });
      },
      switchLegend () {
        this.changeSwitch(BEFORE_UPDATE_COMPONENT_PROPS);
        this.show = !this.show;
        this.changeSwitch(AFTER_UPDATE_COMPONENT_PROPS);
      },
      editData () {
        let data = this.config.target.data,
            th = data.th?data.th.split('.'):data.th,
            td = data.td?data.td.split('.'):data.td,
            thData, tdData;
        if (th) {
          thData = JSON.parse(JSON.stringify(this.configData));
          th.forEach(every=>{
            thData = thData[every];
          })
        }
        if (td) {
          tdData = JSON.parse(JSON.stringify(this.configData));
          td.forEach(every=>{
            tdData = tdData[every];
          })
        }
        this.thData = thData?JSON.parse(JSON.stringify(thData)):thData;
        this.tdData = tdData?JSON.parse(JSON.stringify(tdData)):tdData;
        this.$event.emit('EDITCHARTWINDOW', thData, tdData);
      },
    }
  }
</script>

<style lang="less" scoped>
  .chart_tab {
    >div {
      width: 80%;
      margin: 0 auto;
      color: #fff;
      .show_legend {
        width: 100%;
        height: 30px;
        margin-top: 20px;
        border: 1px solid #fff;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >span {
          text-indent: 10px;
        }
        button {
          padding: 0 8px;
          margin: 2px 0;
          height: 24px;
          background: #abcdef;
          border: none;
          border-radius: 4px;
          font-size: 10px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          outline: none;
        }
      }
      .hide_legend {
        span {
          color: #ab9898;
        }
        button {
          background: #b7babf;
          color: #ab9898;
        }
      }
      .chart_operation {
        >p {
          padding: 10px 0;
        }
        >button {
          background: none;
          outline: none;
          border-radius: 4px;
          border: 1px solid #fff;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
</style>
