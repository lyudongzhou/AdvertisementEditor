<template>
  <ul>
      <component v-for="(cmp,index) in pageData.components" :key="index" :is="cmp.type" :cmpConfig="cmp"/>
  </ul>
</template>
<script>
import * as components from "../../Component";
const cmps = {};
for(let i in components){
    cmps[components[i].name] = components[i];
}
export default {
  name: "singlePage",
  props: ["pageData", "pageIndex"],
  components:cmps,
  methods:{
  },
  mounted() {
  }
};
</script>