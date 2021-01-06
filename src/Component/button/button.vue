<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div :style="computedStyle">
      <span class="textSpan">{{cmpConfig.props.text}}</span>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
let oStyle = {
  [0]({ width, height, bgColor, fontFamily, fontSize, fontColor }) {
    // return `width: 470px;height: 164px;opacity: 1;background: rgb(93, 156, 236);font-family: "Microsoft YaHei";font-size: 59px;line-height: 1.2;padding: 0px;color: rgb(0, 0, 0);text-align: center;border-width: 0px;border-radius: 23.4286px;border-style: solid;border-color: rgb(255, 255, 255);position: relative;overflow: hidden;box-shadow: rgb(255, 255, 255) 0px 19.68px 0px 0px;`;
    return `width: ${width}px; height: ${
      0.882 * height
    }px; opacity: 1; background: ${bgColor}; font-family: "${fontFamily}"; font-size: ${fontSize}px; line-height: 1.2; padding: 0px; color: ${{
      fontColor,
    }}; text-align: center; border-width: 0px; border-radius: ${
      width * 0.05
    }px; border-style: solid; border-color: rgb(255, 255, 255); position: relative; box-shadow: gray 0px ${
      0.118 * height
    }px 0px 0px;`;
  },
  [1]({ width, height, bgColor, fontFamily, fontSize, fontColor }) {
    return `width: ${width}px; height: ${height}px; opacity: 1; background: ${bgColor}; font-family: "${fontFamily}"; font-size: ${fontSize}px; line-height: 1.2; padding: 0px; color: ${fontColor}; text-align: center; border-width: 0px; border-radius: 87.5px; border-style: solid; border-color: rgb(255, 255, 255); position: relative; `;
  },
  [2]({ width, height, bgColor, fontFamily, fontSize, fontColor }) {
    return `width:${width}px; height: ${height}px; background: transparent; font-family: "${fontFamily}"; font-size: ${fontSize}; line-height: 1.2; padding: 0px; color: ${fontColor}; text-align: center; border-width: 6.25px; border-radius: 0px; border-style: solid; border-color: ${bgColor}; position: relative;`;
  },
  [3]({ width, height, bgColor, fontFamily, fontSize, fontColor }) {
    return `width:${width}px; height: ${height}px; opacity: 1; background: ${bgColor}; font-family: "${fontFamily}"; font-size: ${fontSize}; line-height: 1.2; padding: 0px; color: ${fontColor}; text-align: center; border-width: 0px; border-radius: 12.5px; border-style: solid; border-color: rgb(255, 255, 255); position: relative; `;
  },
  [4]({ width, height, bgColor, fontFamily, fontSize, fontColor }) {
    return `width:${width}px; height: ${height}px; opacity: 1; background: ${bgColor}; font-family: "${fontFamily}"; font-size: ${fontSize}px; line-height: 1.2; padding: 0px; color: ${fontColor}; text-align: center; border-width: 0px; border-radius: 790.4px 35px; border-style: solid; border-color: rgb(255, 255, 255); position: relative; box-shadow: gray 0px 21px 10.5px 3.5px;`;
  },
  [5]({ width, height }) {
    return `width:${width}px; height: ${height}px; opacity: 1; background: transparent; font-family: "Microsoft YaHei"; font-size: 104px; line-height: 1.2; padding: 0px; color: transparent; text-align: center; border-width: 0px; border-radius: 0px; border-style: solid; border-color: transparent; position: relative; `;
  },
};
export default {
  name: "buttonCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data() {
    return {
      url: "",
      type: 0,
    };
  },
  watch: {
    "cmpConfig.props.url"(value) {
      this.url = value;
      // if(this.checkUrl(value)){
      //   console.log("checked");

      // }
    },
  },
  methods: {
    // f,
    // checkUrl(value){
    //   return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(value);
    // }
  },
  computed: {
    ...mapGetters(["handleUrl"]),
    computedStyle() {
      let o = {
        width: this.cmpConfig.layoutConfig.width,
        height: this.cmpConfig.layoutConfig.height,
        bgColor: "#FF0",
        fontFamily: "微软雅黑",
        fontSize: 30,
        fontColor: "#FFF",
      };
      return oStyle[this.type](o);
    },
  },
  mounted() {
    this.url = this.cmpConfig.props.url;
  },
};
</script>

<style lang="less" scoped>
.textSpan {
  text-overflow: clip;
  width: auto;
  height: auto;
  min-height: 60%;
  min-width: 60%;
  max-width: 100%;
  max-height: 100%;
  background: 0;
  border: 0 dashed #eee;
  outline: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
