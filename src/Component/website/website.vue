<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
  <iframe ref="iframe" :src="url" style="width:100%;height:100%"></iframe>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
export default {
  name: "websiteCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data() {
    return {
      url: "",
      refreshTime: "",
    };
  },
  watch: {
    "cmpConfig.props.text"(value) {
      if (this.checkUrl(value)) {
        this.url = value;
      }
    },
  },
  methods: {
    checkUrl(value) {
      return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(
        value
      );
    },
  },
  computed: {
    ...mapGetters(["designMode"]),
  },
  mounted() {
    this.url = this.cmpConfig.props.text;
    this.refreshTime = this.cmpConfig.props.refreshTime;
    this.refreshTime = 1000;
    if(!this.designMode&&parseInt(this.refreshTime)){
      this.interval = setInterval(() => {
        this.$refs.iframe.contentWindow.location.reload(true);
      }, parseInt(this.refreshTime));
    }
    // if (this.refreshTime !== undefined) {
    //   this.interval = setInterval(() => {
    //     this.$refs.iframe.$el.contentWindow.location.reload(true);
    //   }, this.refreshTime);
    // }
  },
};
</script>

<style lang="less" scoped>
</style>
