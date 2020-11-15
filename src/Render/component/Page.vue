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
export default {
  name: "singlePage",
  props: ["pageData", "pageIndex"],
  components: cmps,
  methods: {
    fmtStyle() {
      if (this.pageData.container.backGround.type === "image") {
        return {
          'background-image':`url(${this.pageData.container.backGround.value})`
        };
      }else{
        return {
          'background-color':this.pageData.container.backGround.value
        }
      }
    }
  },
  mounted() {
    console.log(this.pageData);
  }
};
</script>