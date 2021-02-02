<template>
  <div class="basic_tab">
    <el-form ref="form" style="width:100%" size="mini" label-position="left">
      <el-form-item v-if="config.support==='文本'" label="文本">
          <textField
              :configData="configData"
              :config="{ props: {}, target: 'props.text' }"
          ></textField>
      </el-form-item>
      <el-form-item v-if="config.notSupport!=='显示格式'" label="显示格式">
        <el-select v-model="defaultFormat" placeholder="请选择" @change="selectFormat">
          <el-option
            v-for="item in formatter"
            :key="item.id"
            :label="item.format"
            :value="item.format">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="大小" style="margin-bottom:50px;">
          <numberField
          style="width:100%"
              :configData="configData"
              :config="{ props: {}, target: 'props.font-size' }"
          ></numberField>
      </el-form-item>
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
    </el-form>
  </div>
</template>

<script>
  import '../../editors';
  import { get } from '@/register';
  import { REG_EDITORS } from '@/const';
  import { mapMutations } from "../../../../store";
  import {
    BEFORE_UPDATE_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
  } from "../../../../constant/schema";

  export default {
    name: 'timeTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    data() {
      return {
        formatter: [
          {
            id: 1,
            format: 'YYYY-MM-dd'
          },
          {
            id: 2,
            format: 'dd-MM-yy'
          },
          {
            id: 3,
            format: 'XXXX年XX月XX日'
          }
        ],
        defaultFormat: "YYYY-MM-dd",
        oldFormat: "YYYY-MM-dd",
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
      changeFormat (type) {
        this.updateSchema({
          type: type,
          value: {
            [this.config.target]: this.oldFormat,
          },
        });
      },
      dealWithTime (data) {
        let Y = data.getFullYear();
        let M = data.getMonth()+1;
        let D = data.getDate();
        M = M<10?`0${M}`:M;
        D = D<10?`0${D}`:D;
        return {
          Y, M, D
        };
      },
      selectFormat () {
        this.changeFormat(BEFORE_UPDATE_COMPONENT_PROPS);
        this.oldFormat = this.defaultFormat;
        this.changeFormat(AFTER_UPDATE_COMPONENT_PROPS);
      }
    },
    watch: {
      defaultFormat (n) {
        let {Y, M, D} = this.dealWithTime(new Date());
        switch (n) {
          case 'YYYY-MM-dd':
            this.configData.props.text = `${Y}-${M}-${D}`;
            break;
          case 'dd-MM-yy':
            this.configData.props.text = `${D}-${M}-${Y}`;
            break;
          default:
            this.configData.props.text = `${Y}年${M}月${D}日`;
        }
      }
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
