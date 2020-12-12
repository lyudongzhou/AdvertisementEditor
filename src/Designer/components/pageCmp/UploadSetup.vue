<template lang="html">
  <div class="upload_setup">
    <div class="add_img el-icon-plus" @click="openUploadDialog(true)"></div>
    <button class="add_img_btn" @click="openUploadDialog(true)">添加图片</button>
    <upload-img v-if="isOpen" @showDialog="openUploadDialog"></upload-img>
  </div>
</template>

<script>
import UploadImg from './UploadImg.vue';

export default {
  name: 'uploadSetup',
  data () {
    return {
      isOpen: false,
    }
  },
  components: {
    UploadImg
  },
  mounted () {
  },
  methods: {
    openUploadDialog (bool) {
      this.isOpen = bool;
    }
  }
}
</script>

<style lang="less" scoped>
  .upload_setup {
    width: 248px;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: flex-end;
    .add_img {
      width: 248px;
      height: 209px;
      background: #FFFFFF;
      border: 1px solid #979797;
      font-size: 76px;
      text-align: center;
      line-height: 209px;
      color: #C6C6C6;
      cursor: pointer;
    }
    .add_img_btn {
      width: 98px;
      height: 36px;
      margin: 20px 0 64px 0;
      background: #ECECEC;
      border:none;
      outline: none;
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      cursor: pointer;
    }
  }
</style>
