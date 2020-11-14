<template>
  <baseCmp :layoutConfig='cmpConfig.layoutConfig'>
    <img :src="cmpConfig.props.bgUrl"/>
  </baseCmp>
</template>
<script>
import baseCmp from "./Base.vue";
export default {
  name: "ImageCmp",
  components: {
    baseCmp
  },
  props:["cmpConfig"]
};
</script>