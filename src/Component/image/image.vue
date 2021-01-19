<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <vue-flux
      style="width: 100%; height: 100%"
      :options="{
        autoPlay: false,
        delay: 0,
        allowFullscreen: false,
      }"
      :images="cmpConfig.props.bgUrl"
      :transitions="[cmpConfig.props.changeType]"
      ref="slider"
    >
    </vue-flux>
  </baseCmp>
</template>
<script>
//与document一致
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
import { VueFlux } from "vue-flux";
export default {
  name: "ImageCmp",
  components: {
    VueFlux,
    baseCmp,
  },
  methods: {
    next() {
      this.$refs.slider.show();
    },
  },
  data: () => {
    return {};
  },
  watch: {
    "cmpConfig.layoutConfig.width"() {
      this.$refs.slider && this.$refs.slider.resize();
    },
    "cmpConfig.layoutConfig.height"() {
      this.$refs.slider && this.$refs.slider.resize();
    },
  },
  created() {
  },
  mounted() {
    this.parent = this.$refs["parent"];
      console.log(1111111111,this.designMode);

    if (this.cmpConfig.props.autoChange && !this.designMode) {
      console.log(1111111111);
      this.interval = setInterval(() => {
        this.next();
      }, this.cmpConfig.props.changeTime * 1000);
    }
    this.$el.addEventLis;
  },
  computed: {
    ...mapGetters(["handleUrl", "designMode"]),
    computedUrl() {
      let arr = [];
      this.cmpConfig.props.bgUrl.forEach((ele) => {
        arr.push(this.handleUrl(ele));
      });
      return arr;
    },
    // aspectRatio() {
    //   return (
    //     this.cmpConfig.layoutConfig.width / this.cmpConfig.layoutConfig.height
    //   );
    // },
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
