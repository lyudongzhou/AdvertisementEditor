<template lang="html">
  <div class="upload_setup">
    <div class="add_img" @click="openUploadDialog(true, showImg)">
      <i class="el-icon-plus" v-if="!bgImg"></i>
      <img v-else :src="bgImg" alt="" />
    </div>
    <div class="buttons">
      <button class="add_img_btn del_img_btn" v-if="bgImg" @click="showImg=null">删除图片</button>
      <button class="add_img_btn" @click="openUploadDialog(true, showImg)">{{bgImg?'替换图片':'添加图片'}}</button>
    </div>
    <upload-img v-if="isOpen" @showDialog="openUploadDialog"></upload-img>
  </div>
</template>

<script>
import UploadImg from './UploadImg.vue';
import { mapGetters, mapMutations } from '../../store';

export default {
  name: 'uploadSetup',
  data () {
    return {
      isOpen: false,
      showImg: null // 背景图
    }
  },
  computed: {
    ...mapGetters([
      'currentPage'
    ]),
    bgImg () {
      if (this.currentPage&&this.currentPage.container.backGround) {
        let bg = this.currentPage.container.backGround;
        if (bg.type==='image') {
          return this.currentPage.container.backGround.value;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  components: {
    UploadImg
  },
  mounted () {
  },
  methods: {
    ...mapMutations([
      'updateSchema',
    ]),
    openUploadDialog (bool, showImg=null) {
      this.isOpen = bool;
      this.showImg = showImg;
    },
  },
  watch: {
    showImg (newValue) {
      this.updateSchema({
        type: "beforeupdatePage"
      });
      this.updateSchema({
        type: "afterPage",
        value: {
          ['type']: 'image',
          ["value"]: newValue
        },
      });
    },
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
      color: #C6C6C6;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
      }
    }
    .buttons {
      display: flex;
    }
    .add_img_btn {
      display: inline-block;
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
    .del_img_btn {
      display: inline-block;
      margin: 20px 20px 64px 0;
    }
  }
</style>
