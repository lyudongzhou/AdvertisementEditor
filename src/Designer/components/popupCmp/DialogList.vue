<template lang="html">
  <div class="pageList">
    <ul>
      <li v-for="list in listName" :key="list.id"
          :type="list.type"
          :class="{'activeList': listActive===list.type}"
          @click="listActive=list.type">{{list.name}}
      </li>
    </ul>
    <component :is="listActive"></component>
  </div>
</template>

<script>
import DialogSetup from './DialogSetup.vue';
import LayerManager from './LayerManager.vue';
import DialogManager from './DialogManager.vue';
import { mapGetters } from "../../store";

export default {
  name: "DialogList",
  data () {
    return {
      listName: [
        {
          id: 1,
          type: 'DialogManager',
          name: '弹窗管理'
        }
      ],
      listNames: [
        {
          id: 1,
          type: 'DialogSetup',
          name: '弹窗设置'
        },
        {
          id: 2,
          type: 'LayerManager',
          name: '图层管理'
        },
        {
          id: 3,
          type: 'DialogManager',
          name: '弹窗管理'
        }
      ],
      listActive: 'DialogManager'
    }
  },
  components: {
    DialogSetup,
    LayerManager,
    DialogManager
  },
  computed: {
    ...mapGetters(["currentDialog"]),
  },
  mounted () {
    if (this.currentDialog) {
      this.listName = this.listNames;
    }
  },
  watch: {
    currentDialog(n) {
      if (n && this.listName.length<3) {
        this.listName = this.listNames;
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .pageList {
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    ul {
      width: 100%;
      display: flex;
      height: 76px;
      line-height: 76px;
      li {
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #B5B5B5;
        background: #424242;
        border-radius: 6px;
        margin: 16px 10px 0 10px;
      }:hover {
        cursor: pointer;
      }
      .activeList {
        background: #535353;
        border-radius: 6px;
        color: #FFFFFF;
      }
    }
  }
</style>
