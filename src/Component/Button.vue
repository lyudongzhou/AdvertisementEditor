<template>
  <baseCmp :layoutConfig="cmpConfig.layoutConfig">
    <div>{{cmpConfig.name}}</div>
  </baseCmp>
</template>
<script>
import baseCmp from "./Base.vue";
export default {
  name: "BtnCmp",
  components: {
    baseCmp
  },
  props: ["cmpConfig"]
};
</script>