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
      :transitions="[getDefaultTranstion()]"
      ref="slider"
      :captions="cmpConfig.props.showName ? getPureImageName() : []"
    >
      <template v-slot:caption>
        <flux-caption />
      </template>
    </vue-flux>
    <div></div>
  </baseCmp>
</template>
<script>
//与document一致
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
import { VueFlux,FluxCaption } from "vue-flux";
export default {
  name: "ImageCmp",
  components: {
    VueFlux,
    baseCmp,
    FluxCaption
  },
  methods: {
    next() {
      this.$refs.slider.show('next');
    },
    getPureImageName() {
      let arr = []
      this.cmpConfig.props.introduce.map(name => arr.push(name));
      return arr
    },
    getDefaultTranstion() {
      if (this.cmpConfig.props.changeType) return this.cmpConfig.props.changeType;
      if (!this.cmpConfig.props.changeType && this.cmpConfig.props.autoChange && !this.designMode) {
        return 'fade';
      } else {
        return ''
      }
    }
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
    // this.cmpConfig.props.bgUrl = ["http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/dist/static/assets/images/1550734569380.png"];
  },
  mounted() {
    this.parent = this.$refs["parent"];
    if (this.cmpConfig.props.autoChange && !this.designMode) {
      this.interval = setInterval(() => {
        this.next();
      }, this.cmpConfig.props.changeTime * 1000);
    }
  },
  computed: {
    ...mapGetters(["handleUrl", "designMode"]),
    computedUrl() {
      let arr = [];
      this.cmpConfig.props.bgUrl.forEach((ele) => {
        arr.push(this.handleUrl(ele.src));
      });
      return arr;
    },
    // aspectRatio() {
    //   return (
    //     this.cmpConfig.layoutConfig.width / this.cmpConfig.layoutConfig.height
    //   );
    // },
  },
  beforeDestroy() {
    this.interval && clearInterval(this.interval);
  },
  props: ["cmpConfig"],
};
</script>
<style lang="less">
.vue-flux{
  .complements{
    align-items: flex-end;
    flex-direction: row;
    .flux-caption{
      // height:100%;
      // background: transparent;
      // transform: translate(0,50%);
      // font-size: 2rem;
    }
  }

  .flux-image {
    background-size: 100% 100% !important;
    background-position: 0% 0% !important;
  }
}
</style>
