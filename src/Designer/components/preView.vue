<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:15:30
 * @LastEditTime: 2020-12-08 23:06:40
 * @Description: file content
-->
<template>
  <el-dialog v-if="isShow" :visible.sync="isShow"
    ><div ref="preview"></div
  ></el-dialog>
</template>

<script>
import render from "../../Render/render";
import { mapState, mapMutations } from "../store";
import Vue from "vue";
import previewStore from "../store/previewStore";
export default {
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
      this.isShow = data;
      this.$nextTick(() => {
        this.renderPreview();
      });
    },
    isShow(value) {
      if (!value) {
        this.setPreviewState({
          previewTotal: false,
          previewing: false,
        });
      }
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(["setPreviewState"]),
    renderPreview() {
      this.previewInstance && this.previewInstance.$destroy();
      console.log(this.currentPageId);
      this.previewInstance = new Vue({
        el: this.$refs["preview"],
        render: (h) => {
          let currentPage = this.currentPageId;
          return h(render, {
            props: {
              renderData: this.schema,
              currentPage: currentPage,
              singlePagePreview: !this.previewTotal,
              baseUrl: "",
            },
          });
        },
        store: previewStore(),
      });
    },
  },
};
</script>

<style></style>
