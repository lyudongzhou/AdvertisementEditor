<template>
  <div
    id="app"
    :style="{'position':'absolute','width':deviceWidth+'px','height':deviceHeight+'px','background-color':'lightgray'}"
  >
    <render
      :displayWidth="deviceWidth"
      :displayHeight="deviceHeight"
      :renderData="renderData"
      :style="{
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)'
          }"
    ></render>
  </div>
</template>
<script>
import render from "./render";
import { renderData } from "../../interface";
export default {
  components: {
    render
  },
  methods: {},
  created() {
    window.addEventListener("resize", () => {
      this.deviceWidth = document.body.clientWidth;
      this.deviceHeight = document.body.clientHeight;
    });
  },
  data() {
    return {
      containerStyle: {},
      deviceWidth: document.body.clientWidth,
      deviceHeight: document.body.clientHeight,
      renderData: renderData
    };
  }
};
</script>
<style scoped>
</style>