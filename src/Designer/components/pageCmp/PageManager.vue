<template lang="html">
  <div class="pageManager">
    <ThumbnailShow></ThumbnailShow>
  </div>
</template>

<script>
import ThumbnailShow from './ThumbnailShow1.vue';

export default {
  name: 'PageManager',
  components: {
    ThumbnailShow,
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .pageManager {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      display: flex;
      li {
        flex: 1;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #B9B9B9;
        padding: 19px 0 14px 0;
      }:hover {
        cursor: pointer;
      }
      .activeShow {
        color: #FFFFFF;
      }
    }
  }
</style>
