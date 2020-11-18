<template lang="html">
  <div class="preview">
    <div class="mask"></div>
    <div class="pt-triggers">
      <button id="iterateEffects" class="pt-touch-button">显示下一页切换</button>
    </div>
    <div id="pt-main" class="pt-perspective" v-if="this.pageData">
      <singlePage v-for="(page, index) in this.pageData" :key="index"
        class="pt-page"
        :pageData="page"
        :pageIndex="page.id"></singlePage>
    </div>
  </div>
</template>

<script>
import singlePage from "./Page";
import {transition} from "../pageChange/libs/transition";

export default {
  name: "preview",
  data () {
    return {
      pageConfig: [this.renderData.pages[this.currentIndex], this.renderData.pages[this.currentIndex+1]]
    }
  },
  props: ["renderData", "currentIndex"],
  computed: {
    pageData: {
      get: function () {
        return this.pageConfig;
      },
      set: function (newValue=null) {
        this.pageConfig = newValue;
      }
    }
  },
  components: {
    singlePage
  },
  mounted () {
    let translate = new transition({
      $main: $('#pt-main'),
      $pages: $('#pt-main').children('div.pt-page'),
      loop: false,
      callback: (index) => {
        // this.pageData[0] = this.pageData[1]
        // this.pageData[1] = this.renderData.pages[2]
        this.pageData = [this.pageConfig[1], this.renderData.pages[2]];
        console.log(this.pageData);
        console.log(index);
      }
    })
    let self = this;
    $('#iterateEffects').click(function () {

      console.log(self.pageData);
        translate.nextPage(67);
    });
  }
}
</script>

<style lang="less" scoped>
  .preview {
    width: 100%;
    height: 100%;
    position: absolute;
    .mask {
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.3;
    }
    .pt-perspective {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      left: 0;
      top: 0;
      .pt-page {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: none;
        overflow: hidden;
        z-index: 0
      }
      .pt-page-current {
        z-index: 1;
        display: inline-block;
      }
    }
  }
</style>
