<template>
  <baseCmp :cmpConfig='cmpConfig'>
    <img :src="cmpConfig.props.bgUrl" style="width:100%;height:100%"/>
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