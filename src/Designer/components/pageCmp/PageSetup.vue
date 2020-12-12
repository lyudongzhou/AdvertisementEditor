<template lang="html">
  <div class="pageSetup">
    <upload-setup></upload-setup>
    <color-picker></color-picker>
  </div>
</template>

<script>
import UploadSetup from './UploadSetup.vue';
import ColorPicker from './ColorPicker';

export default {
  name: 'PageSetup',
  components: {
    UploadSetup,
    ColorPicker,
  },
}
</script>

<style lang="less" scoped>
  .pageSetup {
    position: relative;
    // top: 539px;
  }
</style>
