<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:15:30
 * @LastEditTime: 2020-12-07 03:52:45
 * @Description: file content
-->
<template>
  <el-dialog v-if="isShow" :visible.sync="isShow">
    <render
      :v-if="currentPageId"
      :renderData="vmSchema"
      :currentPage="currentPageId"
      :singlePagePreview="!previewTotal"
      baseUrl=""
    ></render>
  </el-dialog>
</template>


<script>
import render from "../../Render/render";
import { mapState, mapMutations } from "../store";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: { render },
  computed: {
    ...mapState(["vmSchema", "currentPageId", "previewing","previewTotal"]),
  },
  watch: {
    previewing(data) {
        console.log("show");
      this.isShow = data;
    },
    isShow(value) {
      if (!value) {
        this.setPreviewState({previewTotal:false,previewing:false});
      }
    },
  },
  methods: {
    ...mapMutations(["setPreviewState"]),
  },
};
</script>

<style>
</style>
