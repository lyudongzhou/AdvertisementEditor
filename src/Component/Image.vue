<template>
  <baseCmp ref="parent" :cmpConfig='cmpConfig'>
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
  mounted(){
    this.parent = this.$refs["parent"];
  },
  props:["cmpConfig"]
};
</script>