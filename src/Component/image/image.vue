<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <vue-flux
      style="width: 100%; height: 100%"
      :options="{ autoPlay: false, delay: 0 }"
      :images="cmpConfig.props.bgUrl"
      :transitions="[cmpConfig.props.changeType]"
      ref="slider"
    >
    </vue-flux>
  </baseCmp>
</template>
<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
import {
  VueFlux,
} from "vue-flux";
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
    return {

    };
  },
  mounted() {
    this.parent = this.$refs["parent"];
    window.abcccs = this;
    if (this.cmpConfig.props.autoChange&&!this.designMode) {
      this.interval = setInterval(() => {
        this.next();
      }, this.cmpConfig.props.changeTime * 1000);
    }
  },
  computed: {
    ...mapGetters(["handleUrl","designMode"]),
    computedUrl(){
        let arr = [];
        this.cmpConfig.props.bgUrl.forEach((ele)=>{
            arr.push(this.handleUrl(ele));
        });
        return arr;
    }
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
