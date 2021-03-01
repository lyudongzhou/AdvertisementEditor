<template lang="html">
  <div class="pageSetup">
    <upload-setup></upload-setup>
    <color-picker></color-picker>
    <bg-music></bg-music>
  </div>
</template>

<script>
import UploadSetup from './UploadSetup.vue';
import ColorPicker from './ColorPicker';
import BgMusic from './BgMusic';

export default {
  name: 'PageSetup',
  components: {
    UploadSetup,
    ColorPicker,
    BgMusic,
  },
}
</script>

<style lang="less" scoped>
  .pageSetup {
    position: relative;
    overflow-y: scroll;
    // top: 539px;
  }
</style>
