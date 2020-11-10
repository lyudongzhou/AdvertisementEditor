<template>
  <baseCmp :layoutConfig='ItemConfig.layoutConfig'>
    <div>111</div>
  </baseCmp>
</template>
<script>
import baseCmp from "./Base.vue";
export default {
  name: "ImageCmp",
  components: {
    baseCmp
  },
  props:["ItemConfig"]
};
</script>