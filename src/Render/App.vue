<template>
  <div id="app" :style="computedStyle">
    <render
      v-if="renderData"
      :renderData="renderData"
      :currentPage="currentPage"
      @click="onClick"
      :designMode="false"
      :baseUrl="baseUrl"
      :style="{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }"
    ></render>
  </div>
</template>
<script>
import render from "./render";
export default {
  components: {
    render,
  },
  computed: {
    computedStyle() {
      console.log(
        `scale(${this.scale}) translate(${this.translateX},${this.translateY})`
      );
      return {
        position: "absolute",
        width: this.deviceWidth + "px",
        height: this.deviceHeight + "px",
        "background-color": "lightgray",
        transform: `translate(${this.translateX}px,${this.translateY}px) scale(${this.scale})`,
        transformOrigin: "0 0",
      };
    },
    translateX() {
      let width = this.deviceWidth;
      let height = this.deviceHeight;
      var docEl = document.documentElement;
      window.clientWidth = docEl.clientWidth;
      window.clientHeight = docEl.clientHeight;
      if (!window.clientWidth) return null;
      var aspectRatio = window.clientWidth / window.clientHeight;
      if (aspectRatio > width / height) {
        return (
          (window.clientWidth - (width * window.clientHeight) / height) / 2
        );
      } else {
        return 0;
      }
    },
    translateY() {
      let width = this.deviceWidth;
      let height = this.deviceHeight;
      var docEl = document.documentElement;
      window.clientWidth = docEl.clientWidth;
      window.clientHeight = docEl.clientHeight;
      if (!window.clientWidth) return null;
      var aspectRatio = window.clientWidth / window.clientHeight;
      if (aspectRatio > width / height) {
        return 0;
      } else {
        return (
          (window.clientHeight - (height * window.clientWidth) / width) / 2
        );
      }
    },
    scale() {
      let width = this.deviceWidth;
      let height = this.deviceHeight;
      var docEl = document.documentElement;
      window.clientWidth = docEl.clientWidth;
      window.clientHeight = docEl.clientHeight;
      if (!window.clientWidth) return null;
      var aspectRatio = window.clientWidth / window.clientHeight;
      if (aspectRatio > width / height) {
        return window.clientHeight / height;
      } else {
        return window.clientWidth / width;
      }
    },
  },
  methods: {
    onClick() {},
  },
  created() {},
  data() {
    return {
      containerStyle: {},
      deviceWidth: window.renderData.container.width,
      deviceHeight: window.renderData.container.height,
      renderData: window.renderData,
      currentPage: window.renderData.pages[0].id,
      baseUrl: "",
    };
  },
};
</script>
<style scoped></style>
