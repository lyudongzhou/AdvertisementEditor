<template>
  <div
    id="app"
    :style="{'position':'absolute','width':deviceWidth+'px','height':deviceHeight+'px','fontSize':Math.min(deviceWidth/renderData.container.width,deviceHeight/renderData.container.height)+'px','background-color':'#ff0000'}"
  >
    <render
      :renderData="renderData"
      :style="{
          'position':'absolute',
          'width':renderData.container.width+'em',
          'height':renderData.container.height+'em',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)','background-color':'#00ff00'
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
  created() {
    window.addEventListener("resize", ()=> {
      this.deviceWidth = document.body.clientWidth;
      this.deviceHeight = document.body.clientHeight;
    });
    //   let pw = this.deviceWidth/this.renderData.container.width;
    //   let ph = this.deviceHeight/this.renderData.container.height;
    //   let p = Math.min(pw,ph);
  },
  data() {
    return {
        containerStyle:{},
      deviceWidth: document.body.clientWidth,
      deviceHeight: document.body.clientHeight,
      renderData: renderData
    };
  }
};
</script>
<style scoped>

</style>