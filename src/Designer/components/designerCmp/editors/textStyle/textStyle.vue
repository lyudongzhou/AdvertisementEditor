<template>
    <el-form ref="form" style="width:100%" size="mini" label-position="left">
      <el-form-item label="文本">
          <textField
              :configData="configData"
              :config="{ props: {}, target: 'props.text' }"
          ></textField>
      </el-form-item>
      <el-form-item label="字体">
          <el-select
              v-model="fontFamily"
              placeholder="请选择"
              @change="onChange('props.fontFamily', fontFamily)"
              style="width:100%"
          >
              <el-option
                  v-for="item in fontFamilies"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item v-if="config&&!config.notSupport||config.notSupport!=='倾斜'" label="倾斜">
          <el-radio
              v-model="fontStyle"
              label="normal"
              @change="onChange('props.fontStyle', fontStyle)"
              >正常</el-radio
          >
          <el-radio
              v-model="fontStyle"
              label="italic"
              @change="onChange('props.fontStyle', fontStyle)"
              >倾斜</el-radio
          >
      </el-form-item>
      <el-form-item label="大小">
          <numberField
          style="width:100%"
              :configData="configData"
              :config="{ props: {}, target: 'props.fontSize' }"
          ></numberField>
      </el-form-item>
      <el-form-item label="文字颜色">
        <colorpickerFiled
            :configData="configData"
            :config="colorpickerConfig"
        ></colorpickerFiled>
      </el-form-item>
    </el-form>
</template>

<script>
import { getPropByPath } from "@/utils";
// import Throttle from "../../../../manager/updateThrottle";
import numberField from "../numberField/numberField";
import textField from "../textField/textField";
import colorpickerFiled from "../colorpickerFiled/colorpickerFiled";
import {UPDATE_COMPONENT_PROPS} from "../../../../constant/schema";
import {mapMutations} from "../../../../store";
export default {
    name: "textStyle",
    props: ["configData", "config"],
    created() {},
    components: {
      numberField,
      textField,
      colorpickerFiled,
    },
    data() {
      return {
        fontFamily: "微软雅黑",
        fontFamilies: [
          {
            value: "微软雅黑",
            label: "微软雅黑",
          },
          {
            value: "黑体",
            label: "黑体",
          },
        ],
        fontStyle: "normal",
        colorpickerConfig: {
          "target": "props.color",
          "props": {
            "changeType": "cmp",
            "type": {
              "before": "BEFORE_UPDATE_COMPONENT_PROPS",
              "update": "UPDATING_COMPONENT_PROPS",
              "after": "AFTER_UPDATE_COMPONENT_PROPS"
            }
          },
        },
      };
    },
    computed: {
        dataFontFamily() {
            return getPropByPath(this.configData, "props.fontFamily");
        },
        dataFontStyle() {
            return getPropByPath(this.configData, "props.fontStyle");
        },
    },
    methods: {
        ...mapMutations(["updateSchema"]),
        changeFun(type,path,value) {
            this.updateSchema({
                type: type,
                value: {
                    [path]: value,
                },
            });
        },
        onChange(path, value) {
            this.changeFun(UPDATE_COMPONENT_PROPS,path,value);
            // console.log('onChange',value)
            // Throttle.update(target,value);
        },
    },
    watch: {
        text() {
            // console.log("textChange");
        },
        dataFontStyle(text) {
            this.fontStyle = text;
        },
        dataFontFamily(text) {
            this.fontFamily = text;
        },
    },
    mounted() {
        this.isMounted = true;
        this.fontFamily = this.dataFontFamily;
        this.fontStyle = this.dataFontStyle;
        // console.log("init", this.text);
    },
};
</script>

<style></style>
