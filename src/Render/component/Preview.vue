<template lang="html">
  <div class="preview">
    <div class="mask"></div>
    <button id="prevBtn" @click="handlePrevPage">上一页</button>
    <button id="nextBtn" @click="handleNextPage">下一页</button>

    <div id="pt-main" class="pt-perspective" v-if="this.pageData">
      <singlePage v-for="(page, index) in this.pageData" :key="page.id"
        class="pt-page"
        :pageState="index===0?pageState:0"
        :pageData="page"
        :pageIndex="page.id"></singlePage>
    </div>
  </div>
</template>

<script>
import singlePage from "./Page";
import {mapActions, mapGetters} from '../store';
import {transition} from "../pageChange/libs/transition";

export default {
  name: "preview",
  data () {
    return {
      pageConfig: [this.renderData.pages[this.currentIndex], this.renderData.pages[this.currentIndex+1]],
      pageState: 0
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
    },
    ...mapGetters(['currentPage']),
  },
  components: {
    singlePage
  },
  created () {
    this.pageState = 1;
  },
  mounted () {
    this.pageState = 2;
    this.cutPageInit({
      $main: $('#pt-main'),
      $pages: $('#pt-main').children('ul.pt-page'),
      current: 0
    });
  },
  methods: {
    ...mapActions([
      'nextPage',
      'prevPage'
    ]),
    cutPageInit ({$main, $pages, current}) {
      this.translate = new transition({
        $main,
        $pages,
        current,
        loop: false,
        callback: () => {
          this.pageState = 2;
        }
      })
    },
    /**
     * 下一页
     */
    handleNextPage () {
      if (this.currentIndex+1 < this.renderData.pages.length) {
        this.pageState = 3;
        this.nextPage();
        this.pageState = 1;
        this.translate.nextPage(1);
        setTimeout(() => {
          this.changePageData('next', this.currentPage+1);
        }, 800)
      }
    },
    /**
     * 上一页
     */
    handlePrevPage () {
      if (this.currentIndex-1 >= 0) {
        this.pageState = 3;
        this.prevPage();
        this.changePageData('prev', this.currentPage).then(() => {
          this.pageState = 1;
          this.translate.nextPage(2);
        })
      }
    },
    /**
     * 修改页面展示的数据
     * @param type {next||prev||assign}
     * @param pageIndex {Number}
     * @param current {0||1} init animation时需要的option.current
     */
    changePageData (type, pageIndex) {
      return new Promise (resolve => {
        if (type === 'prev') {
          console.log(this.renderData.pages[this.currentPage].id);
          this.pageData.splice(this.pageData.findIndex(child=>child.id !== this.renderData.pages[this.currentPage].id), 1);
        } else {
          this.pageData.splice(this.pageData.findIndex(child=>child.id !== this.renderData.pages[this.currentPage].id), 1);
        }
        this.pageData.push(this.renderData.pages[pageIndex]);
        console.log(...this.pageData);
        this.$nextTick(() => {
          // 更改切页数据
          this.cutPageInit({
            $main: $('#pt-main'),
            $pages: $('#pt-main').children('ul.pt-page')
          });
          resolve();
        })
      })
    }
  },
  updated () {
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
