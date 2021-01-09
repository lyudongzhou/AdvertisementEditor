<template>
  <div class="basic_tab">
    <el-form ref="form" style="width:100%" size="mini" label-position="left">
      <el-form-item label="文字颜色">
        <colorpickerFiled
            :configData="configData"
            :config="{props:colorpickerConfig,target: 'props.color'}"
        ></colorpickerFiled>
      </el-form-item>
      <el-form-item label="背景颜色">
        <colorpickerFiled
            :configData="configData"
            :config="{props:colorpickerConfig,target: 'props.background'}"
        ></colorpickerFiled>
      </el-form-item>
      <el-form-item label="大小" style="margin-bottom:50px;">
          <numberField
          style="width:100%"
              :configData="configData"
              :config="{ props: {}, target: 'props.font-size' }"
          ></numberField>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import '../../editors';
  import { get } from '@/register';
  import { REG_EDITORS } from '@/const';
  import { mapMutations } from "../../../../store";

  export default {
    name: 'timeTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    data() {
      return {
        colorpickerConfig: {
          "changeType": "cmp",
          "type": {
            "before": "BEFORE_UPDATE_COMPONENT_PROPS",
            "update": "UPDATING_COMPONENT_PROPS",
            "after": "AFTER_UPDATE_COMPONENT_PROPS"
          }
        },
      }
    },
    mounted () {
    },
    methods: {
      ...mapMutations(["updateSchema"]),
    }
  }
</script>

<style lang="less" scoped>
  .time_tab {
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
          border: 1px solid #fff;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
</style>
