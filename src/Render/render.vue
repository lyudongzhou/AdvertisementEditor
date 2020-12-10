<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-02 23:43:21
 * @LastEditTime: 2020-12-07 03:44:46
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
    <audio ref="bgm" :src="handleUrl(renderData.container.bgm.src)"></audio>
    <!-- <singlePage
            :pageData="renderData.pages[currentIndex]"
            :pageIndex="currentIndex"
        ></singlePage> -->
    <preview
      ref="preview"
      :renderData="renderData"
      :currentIndex="currentIndex"
    ></preview>
  </div>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
// import singlePage from "./component/Page";
import preview from "./component/Preview";
import pipe from "./pipe";
import { mapGetters, mapMutations } from "./store";
export default {
  name: "app",
  props: [
    "renderData",
    "currentPage",
    "designMode",
    "baseUrl",
    "singlePagePreview",
  ],
  data() {
    return {};
  },
  computed: {
    currentIndex() {
      return this.$store.state.currentRenderState.currentPage;
    },
    pageCount() {
      return this.renderData.pages.length;
    },
    ...mapGetters(["handleUrl"]),
  },
  watch: {
    renderData(data) {
      this.setSchema(data);
      console.log("change");
    },
    pageCount(data) {
      this.pageCountChange(data);
    },
    currentPage(data) {
      this.jumpPageImmediately(data);
    },
    designMode(data) {
      this.setDesignMode(data);
    },
  },
  created() {
    console.log(this.singlePagePreview);
    this.setSinglePagePreview(this.singlePagePreview);
    this.pageCountChange(this.pageCount);
    this.setBaseUrl(this.baseUrl);
    this.setDesignMode(this.designMode);
    this.setSchema(this.renderData);
    pipe.on("click", (dom, componentId) => {
      this.$emit("click", dom, componentId);
    });
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
    }
    window.abccc = this;
  },
  methods: {
    ...mapMutations([
      "setSchema",
      "pageCountChange",
      "jumpPageImmediately",
      "setDesignMode",
      "setBaseUrl",
      "setSinglePagePreview",
    ]),
    getCmp(id) {
      return this.$refs["preview"].getCmp(id);
    },
  },
};
</script>

<style></style>
