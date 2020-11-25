<template>
  <div class="them-dark-bg full-height right_bar">
    <p class="title">
      <span v-for="list in titleList"
            :key="list.id"
            :class="{'frameActive':listActive===list.type}"
            @click="listActive=list.type">{{list.name}}</span>
    </p>
    <component :is="listActive"></component>
  </div>
</template>

<script>
  import { mapState } from '../store';
  import PageList from './pageCmp/PageList.vue';
  import PopupList from './popupCmp/PopupList.vue';

  export default {
    name: "pageFrame",
    components: {
      PageList,
      PopupList
    },
    created() {
    },
    data() {
      return {
        titleList: [
          {
            id: 1,
            type: 'PageList',
            name: '页面'
          },
          {
            id: 2,
            type: 'PopupList',
            name: '弹窗'
          }
        ],
        listActive: 'PageList'
      };
    },
    computed: {
      ...mapState([
        'currentPage',
        'pages',
        'schema'
      ])
    },
    mounted () {

    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .right_bar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 100%;
      height: 40px;
      display: flex;
      line-height: 40px;
      text-align: center;
      span {
        flex: 1;
        background: #424242;
        border: 1px solid #383838;
        box-sizing: border-box;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #B5B5B5;
      }:hover {
        cursor: pointer;
        background: #535353;
        color: #ffffff;
      }
      .frameActive {
        background: #535353;
        color: #ffffff;
      }
    }
  }
</style>
