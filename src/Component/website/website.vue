<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
  <iframe :src="url" style="width:100%;height:100%"></iframe>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";

export default {
  name: "websiteCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data(){
    return {
      url:""
    }
  },
  watch:{
    "cmpConfig.props.text"(value){
      if(this.checkUrl(value)){
        this.url = value;
      }
    }
  },
  methods:{
    checkUrl(value){
      return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(value);
    }
  },
  computed: {},
  mounted() {
    this.url = this.cmpConfig.props.text;
  },
};
</script>

<style lang="less" scoped>
</style>
