<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:15:30
 * @LastEditTime: 2020-12-21 02:18:40
 * @Description: file content
-->
<template>
  <div v-if="isShow" style="position: absolute; z-index: 10">
    <div ref="preview" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import render from "../../Render/render";
import { mapState, mapMutations } from "../store";
import Vue from "vue";
import previewStore from "../store/previewStore";
export default {
  props: {
    // 翻页方式--由父组件传给子组件
    pageType: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  components: {},
  computed: {
    ...mapState(["schema", "currentPageId", "previewing", "previewTotal"]),
  },
  watch: {
    previewing(data) {
      console.log("preview", data);
      this.isShow = data;
      // if (this.isShow) {
      // this.$nextTick(() => {
      this.renderPreview();
      // });
      // }
    },
    isShow(value) {
      if (!value) {
        this.setPreviewState({
          previewing: false,
        });
      }
    },
  },
  mounted() {
    this.isShow = true;
    this.renderPreview();
  },
  methods: {
    ...mapMutations(["setPreviewState"]),
    renderPreview() {
      this.previewInstance && this.previewInstance.$destroy();
      this.$nextTick(() => {
        this.previewInstance = new Vue({
          el: this.$refs["preview"],
          render: (h) => {
            let currentPage = this.currentPageId;
            this.$emit("afterRender");
            return h(render, {
              props: {
                renderData: this.schema,
                currentPage: currentPage,
                singlePagePreview: !this.previewTotal,
                baseUrl: "",
                pageType: this.pageType
              },
            });
          },
          store: previewStore(),
        });
        console.log(this.previewInstance);
      });
    },
    nextPage() {
      this.previewInstance.$children[0].nextPage();
    },
    prePage(){
      this.previewInstance.$children[0].prePage()
    }
  },
};
</script>

<style></style>
