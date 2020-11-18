<template lang="html">
  <div class="preview">
    <div class="mask"></div>
    <div class="pt-page pt-page-4"></div>
  </div>
</template>

<script>
// import render from "../render";

export default {
  name: "preview",
  props: ["renderData", "currentPage"],
  components: {
    // render
  },
  mounted () {
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

  }
</style>

preview.vue
