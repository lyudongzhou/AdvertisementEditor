<template lang="html">
  <div class="pageManager">
    <!-- 截图依赖的dom -->
    <ul>
      <li v-for="list in listName"
          :key="list.id"
          @click="listActive=list.type"
          :class="{'activeShow':listActive===list.type}">{{list.name}}</li>
    </ul>
    <component :is="listActive"></component>
  </div>
</template>

<script>
import ThumbnailShow from './ThumbnailShow.vue';
import ListShow from './ListShow.vue';

export default {
  name: 'PageManager',
  components: {
    ThumbnailShow,
    ListShow
  },
  data () {
    return {
      listName: [
        {
          id: 1,
          type: 'ThumbnailShow',
          name: '缩略图展示'
        },
        {
          id: 2,
          type: 'ListShow',
          name: '列表展示'
        }
      ],
      listActive: 'ThumbnailShow'
    }
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
