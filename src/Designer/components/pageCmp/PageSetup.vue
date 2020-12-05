<template lang="html">
  <div class="pageSetup">
    <color-picker></color-picker>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker';

export default {
  name: 'PageSetup',
  components: {
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
