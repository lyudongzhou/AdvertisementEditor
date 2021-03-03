<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <div :style="publicList" ref="text" @click="openEdit">
      {{ cmpConfig.props.text }}
    </div>
  </baseCmp>
</template>
<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/index";
export default {
  name: "textCmp",
  components: {
    baseCmp,
  },
  props: ["cmpConfig"],
  mounted() {
    this.parent = this.$refs["parent"];
  },
  computed: {
    ...mapGetters(["designMode"]),
    textStyle() {
      return this.cmpConfig.props;
    },
    publicList() {
      const style = {
        width: "100%",
        "overflow-wrap": "break-word",
      };
      Object.keys(this.textStyle).forEach((key) => {
        switch (key) {
          case "fontFamily":
            style["font-family"] = this.textStyle[key];
            break;
          case "fontWeight":
            style["font-weight"] = this.textStyle[key];
            break;
          case "fontStyle":
            style["font-style"] = this.textStyle[key];
            break;
          case "fontSize":
            style["font-size"] = this.textStyle[key] + "px";
            break;
          case "color":
            style["color"] = this.textStyle[key];
            break;
          case "background":
            style["background"] = this.textStyle[key];
            break;
          case "fontAlign":
            style["text-align"] = this.textStyle[key];
            break;
          case "decoration":
            style["text-decoration"] = this.textStyle[key];
        }
      });
      return style;
    },
  },
  methods: {
    openEdit() {
      console.log(this.designMode);
    },
  },
};
</script>
