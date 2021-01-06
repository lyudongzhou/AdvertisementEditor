<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div v-html="tmpSvg"></div>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
// import vueQr from "vue-qr";
import {get} from "@/register";
import {SVGS} from "@/const";
import "./tmp";
export default {
  name: "svgCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
    // vueQr,
  },
  computed: {
    tmpSvg(){
      return get(SVGS)[this.cmpConfig.props.type](this.cmpConfig);
    }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>
