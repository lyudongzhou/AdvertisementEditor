<template lang="html">
  <div class="dialogSetup">
    <upload-setup></upload-setup>
    <color-picker></color-picker>
  </div>
</template>

<script>
import UploadSetup from './UploadSetup.vue';
import ColorPicker from './ColorPicker';

export default {
  name: 'DialogSetup',
  components: {
    UploadSetup,
    ColorPicker,
  },
}
</script>

<style lang="less" scoped>
  .dialogSetup {
    position: relative;
    // top: 539px;
  }
</style>
