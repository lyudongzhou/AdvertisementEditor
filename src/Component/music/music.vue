<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <img/>
  </baseCmp>
</template>
<script>
//与document一致
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
export default {
  name: "musicCmp",
  components: {
    VueFlux,
    baseCmp,
  },
  methods: {
  },
  data: () => {
    return {};
  },
  watch: {

  },
  created() {
  },
  mounted() {
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
    //   console.log(231);
    //   return (
    //     this.cmpConfig.layoutConfig.width / this.cmpConfig.layoutConfig.height
    //   );
    // },
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
