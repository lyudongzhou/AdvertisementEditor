<template>
  <div class="chart_tab">
    <div>

      <div :class="show?'show':'hide'" class="show_legend">
        <span>提示图例</span>
        <button @click="switchLegend">{{show?'ON':'OFF'}}</button>
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
      }
    },
    mounted () {
      console.log(this.configData, this.config);
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      changeFun (type) {
        this.updateSchema({
          type: type,
          value: {
            [this.config.target.switch]: this.show,
          },
        });
      },
      switchLegend () {
        this.changeFun(BEFORE_UPDATE_COMPONENT_PROPS);
        this.show = !this.show;
        this.changeFun(AFTER_UPDATE_COMPONENT_PROPS);
      },
      editData () {
        this.$event.emit('edit-window', this.configData);
      },
    }
  }
</script>

<style lang="less" scoped>
  .chart_tab {
    >div {
      width: 80%;
      margin: 0 auto;
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
      .hide {
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
          border: 1px solid;
          cursor: pointer;
        }
      }
    }
  }
</style>
