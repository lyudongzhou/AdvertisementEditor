<template>
  <ul :style="fmtStyle(this.pageData)">
    <component
      v-for="(cmp,index) in pageData.components"
      :key="index"
      :is="cmp.type"
      :cmpConfig="cmp"
    />
  </ul>
</template>
<script>
import * as components from "../../Component";
const cmps = {};
for (let i in components) {
  cmps[components[i].name] = components[i];
}
//props属性：
//pageState
//0 准备进入 1 进入中 2 已进入 3 弹出中
export default {
  name: "singlePage",
  props: ["pageData", "pageIndex","pageState"],
  components: cmps,
  methods: {
    fmtStyle() {
      if (this.pageData.container.backGround.type === "image") {
        return {
          'background-image':`url(${this.pageData.container.backGround.value})`,
          'width':"100%",
          "height":"100%"
        };
      }else{
        return {
          'background-color':this.pageData.container.backGround.value,
          'width':"100%",
          "height":"100%"
        }
      }
    }
  },
  mounted() {
    console.log(this.pageData);
  }
};
</script>