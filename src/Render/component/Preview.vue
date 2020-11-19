<template lang="html">
  <div class="preview">
    <div class="mask"></div>
    <div class="pt-triggers" @click="handleNextPage">
      <button id="iterateEffects" class="pt-touch-button">显示下一页切换</button>
    </div>
    <div id="pt-main" class="pt-perspective" v-if="this.pageData">
      <singlePage v-for="page in this.pageData" :key="page.id"
        class="pt-page"
        :pageData="page"
        :pageIndex="page.id"></singlePage>
    </div>
  </div>
</template>

<script>
import singlePage from "./Page";
import {mapActions} from '../store';
import {transition} from "../pageChange/libs/transition";

export default {
  name: "preview",
  data () {
    return {
      pageConfig: [this.renderData.pages[this.currentIndex], this.renderData.pages[this.currentIndex+1]],
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
    this.cutPageInit({
      $main: $('#pt-main'),
      $pages: $('#pt-main').children('div.pt-page')
    });
  },
  methods: {
    ...mapActions([
      'nextPage'
    ]),
    cutPageInit ({$main, $pages}) {
      this.translate = new transition({
        $main,
        $pages,
        loop: false,
        callback: () => {
          console.log('done');
          this.changePageData();
        }
      })
    },
    /**
     * 下一页
     */
    handleNextPage () {
      if (this.currentIndex+1 < this.renderData.pages.length) {
        this.nextPage();
        this.translate.nextPage(67);
      }
    },
    /**
     * 修改页面展示的数据
     */
    changePageData () {
      if (this.currentIndex+1 < this.renderData.pages.length) {
        this.pageData.shift();
        this.pageData.push(this.renderData.pages[this.currentIndex+1]);
      }
    }
  },
  updated () {
    this.cutPageInit({
      $main: $('#pt-main'),
      $pages: $('#pt-main').children('div.pt-page')
    });
  },
  watch: {}
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
