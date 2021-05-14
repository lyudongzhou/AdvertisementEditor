<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-02 23:43:21
 * @LastEditTime: 2020-12-21 00:19:36
 * @Description: file content
-->
<template>
  <div
    :style="{
      position: 'relative',
      width: renderData.container.width + 'px',
      height: renderData.container.height + 'px',
    }"
  >
    <audio
      ref="bgm"
      :src="handleUrl(getPropByPath(renderData, 'container.bgm.src'))"
    ></audio>
    <!-- <singlePage
            :pageData="renderData.pages[currentIndex]"
            :pageIndex="currentIndex"
        ></singlePage> -->
    <preview
      style="z-index: 1"
      ref="preview"
      :renderData="renderData"
      :currentIndex="currentIndex"
      :pageType="pageType"
    ></preview>
    <span class="paging" :style="fmtPagingStyle()">{{ paging }}</span>
  </div>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
// import singlePage from "./component/Page";
import preview from "./component/Preview";
import pipe from "./pipe";
import { mapGetters, mapMutations } from "./store";
import { getPropByPath } from "@/utils";
export default {
  name: "app",
  props: [
    "renderData",
    "currentPage",
    "designMode",
    "baseUrl",
    "singlePagePreview",
    "Production",
    "pageType"
  ],
  data() {
    return {
      paging: "",
    };
  },
  computed: {
    currentIndex() {
      return this.$store.state.currentRenderState.currentPage;
    },
    pageCount() {
      return this.renderData.pages.length;
    },
    ...mapGetters(["handleUrl", "currentPageStore"]),
    pageFmt() {
      return this.renderData.container.paging.fmt;
    },
  },
  watch: {
    renderData(data) {
      this.setSchema(data);
    },
    pageCount(data) {
      this.pageCountChange(data);
    },
    currentPage(data) {
      this.jumpPageImmediately(data);
      this.setPaging();
    },
    currentPageStore() {
      this.setPaging();
    },
    pageFmt() {
      this.setPaging();
    },
    designMode(data) {
      this.setDesignMode(data);
    },
  },
  created() {
    // console.log(this.singlePagePreview);
    this.setCurrentPage(this.currentPage);
    this.setSinglePagePreview(this.singlePagePreview);
    this.pageCountChange(this.pageCount);
    this.setBaseUrl(this.baseUrl);
    this.setDesignMode(this.designMode);
    this.setSchema(this.renderData);
    pipe.on("click", (dom, componentId) => {
      this.$emit("click", dom, componentId);
    });
    pipe.on("ctrlClick", (dom, componentId) => {
      this.$emit("ctrlClick", dom, componentId);
    });
    pipe.on("rightClick", (dom, componentId, event) => {
      this.$emit("rightClick", dom, componentId, event);
    });
    console.log(this.currentPage);
  },
  components: {
    // singlePage,
    preview,
    // ImageCmp
  },
  mounted() {
    if (
      !this.singlePagePreview &&
      this.renderData.container.bgm.autoPlay &&
      !this.designMode
    ) {
      this.$refs.bgm.play();
      this.$refs.bgm.volume = parseInt(
        this.renderData.container.bgm.volume / 100
      );
    }
    this.setPaging();
  },
  methods: {
    ...mapMutations([
      "setSchema",
      "pageCountChange",
      "jumpPageImmediately",
      "setDesignMode",
      "setBaseUrl",
      "setCurrentPage",
      "setSinglePagePreview",
    ]),
    getPropByPath(...args) {
      return getPropByPath(...args);
    },
    getCmp(id) {
      return this.$refs["preview"].getCmp(id);
    },
    nextPage(){
      this.$refs["preview"].handleNextPage();
    },
    prePage(){
      this.$refs["preview"].handlePrevPage();
    },
    findCurrentIndex(chooice, useId) {
      let getIndex;
      this.renderData[chooice].some((child, index) => {
        if (child.id === useId) {
          getIndex = index;
          return true;
        }
      });
      return getIndex;
    },
    setPaging() {
      let data = this.currentPageStore;
      let index = this.findCurrentIndex("pages", data);
      let total;
      if (index!==undefined) {
        total = this.renderData.pages.length;
      } else {
        index = this.findCurrentIndex("dialogs", data);
        total = this.renderData.dialogs.length;
      }
      let fmt = new String(this.renderData.container.paging.fmt);
      this.paging = fmt
        .replace("${CURRENT}", index + 1)
        .replace("${TOTAL}", total);
    },
    setPagingPosition() {},
    fmtPagingStyle() {
      let o = {};
      // this.renderData.container.paging.fmt;
      switch (this.renderData.container.paging.position) {
        case "hide":
          o.left = "9999px";
          break;
        case "center$bottom":
          o.left = "50%";
          o.bottom = "0";
          o.transform = "translate(-50%,0)";
          break;
        case "center$top":
          o.left = "50%";
          o.top = 0;
          o.transform = "translate(-50%,0)";
          break;
        case "left$top":
          o.left = "0";
          o.top = "0";
          break;
        case "left$bottom":
          o.left = "0";
          o.bottom = "0";
          break;
        case "right$top":
          o.right = "0";
          o.top = "0";
          break;
        case "right$bottom":
          o.right = "0";
          o.bottom = "0";
          break;
      }
      o.color = this.renderData.container.paging.color;
      o["font-size"] = this.renderData.container.paging.size+"px";
      o["font-family"] = this.renderData.container.paging.family;
      o["background"] = this.renderData.container.paging.bgColor;
      return o;
    },
  },
};
</script>

<style scoped>
.paging {
  z-index: 2;
  color: white;
  font-size: 40px;
  position: absolute;
}
</style>
