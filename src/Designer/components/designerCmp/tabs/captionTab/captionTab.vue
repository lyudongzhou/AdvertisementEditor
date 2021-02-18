<template>
  <div class="basic_tab">
    <el-form ref="form" style="width:100%" size="mini" label-position="left">
      <el-form-item label="位置">
        <el-select v-model="locationDefault" placeholder="请选择" @change="changeLocation">
          <el-option
            v-for="item in locationOption"
            :key="item.id"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="directionDefault" placeholder="请选择" @change="changeDirection">
          <el-option
            v-for="item in directionOption"
            :key="item.id"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
          <textField
              :configData="configData"
              :config="{ props: {}, target: 'props.text' }"
          ></textField>
      </el-form-item>
      <el-form-item label="文字颜色" v-if="!config.isFirstEdit" >
        <colorpickerFiled
            :configData="configData"
            :config="{props:colorpickerConfig,target: 'props.color'}"
        ></colorpickerFiled>
      </el-form-item>
      <el-form-item label="背景颜色" v-if="!config.isFirstEdit" >
        <colorpickerFiled
            :configData="configData"
            :config="{props:colorpickerConfig,target: 'props.background'}"
        ></colorpickerFiled>
      </el-form-item>
      <el-form-item label="大小" style="margin-bottom:50px;" v-if="!config.isFirstEdit" >
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
  import {
    BEFORE_UPDATE_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
  } from "../../../../constant/schema";

  export default {
    name: 'captionTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    data() {
      return {
        locationDefault: this.configData.props.location,
        locationOption: [
          {
            id: 1,
            type: '顶部'
          },
          {
            id: 2,
            type: '居中'
          },
          {
            id: 3,
            type: '底部'
          }
        ],
        directionDefault: this.configData.props.direction,
        directionOption: [
          {
            id: 1,
            type: '从左往右',
          },
          {
            id: 2,
            type: "从右往左",
          }
        ],
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
    computed: {
    },
    mounted () {
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      changeLocation (change) {
        let params = {props:'props.location', value: this.configData.props.location};
        this.locationDefault = change;
        this.changeFormat(BEFORE_UPDATE_COMPONENT_PROPS, params);
        this.changeFormat(AFTER_UPDATE_COMPONENT_PROPS, Object.assign(params, {value: change}));
      },
      changeDirection (change) {
        let params = {props:'props.direction', value: this.configData.props.direction};
        this.directionDefault = change;
        this.changeFormat(BEFORE_UPDATE_COMPONENT_PROPS, params);
        this.changeFormat(AFTER_UPDATE_COMPONENT_PROPS, Object.assign(params, {value: change}));
      },
      changeFormat (type,params) {
        this.updateSchema({
          type: type,
          value: {
            [params.props]: params.value,
          },
        });
      },
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  .caption_tab {
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
