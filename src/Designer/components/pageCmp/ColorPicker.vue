<template lang="html">
  <div class="colorPicker">
    <p>纯色背景</p>
    <colorpickerFiled :configData="currentPage" :config="config"></colorpickerFiled>
  </div>
</template>

<script>
import { mapGetters } from '../../store';
import colorpickerFiled from '../designerCmp/editors/colorpickerFiled/colorpickerFiled';

export default {
  name: 'ColorPicker',
  components: {
    colorpickerFiled
  },
  data () {
    return {
      config: {
        props: {
          changeType: 'page',
          type: {
            before: 'beforeupdatePage',
            update: 'updatingPage',
            after: 'afterPage'
          }
        },
        target: 'container.backGround',
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentPage'
    ]),
  },
  mounted () {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
  .colorPicker {
    position: relative;
    width: 244px;
    margin: auto;
    >p {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 22px;
    }
  }
</style>
