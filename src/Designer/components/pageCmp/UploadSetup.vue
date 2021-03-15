<template lang="html">
  <div class="upload_setup">
    <div class="add_img" @click="openUploadDialog(true, bgImg)">
      <i class="el-icon-plus" v-if="!bgImg"></i>
      <img v-else :src="bgImg" alt="" />
    </div>
    <div class="buttons">
      <button class="add_img_btn del_img_btn" v-if="bgImg" @click="deleteImage">删除图片</button>
      <button class="add_img_btn" @click="openUploadDialog(true, bgImg)">{{bgImg?'替换图片':'添加图片'}}</button>
    </div>
    <!-- <upload-img v-if="isOpen" @showDialog="openUploadDialog"></upload-img> -->
  </div>
</template>

<script>
// import UploadImg from './UploadImg.vue';
import { mapGetters, mapMutations } from "../../store";

export default {
  name: "uploadSetup",
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["currentPage"]),
    bgImg() {
      if (this.currentPage && this.currentPage.container.backGround) {
        let bg = this.currentPage.container.backGround;
        if (bg.type === "image") {
          return this.currentPage.container.backGround.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  components: {
    // UploadImg
  },
  mounted() {},
  methods: {
    ...mapMutations(["updateSchema"]),
    openUploadDialog() {
      this.$event.emit("openUploadWin", {
        onSelect: this.onSelect.bind(this),
        aSelectType: ["image"],
        multi: false,
        title: "背景图片",
      });
    },
    onSelect(a) {
      if (!a||a.length===0) {
        return;
      }
      
      this.updateSchema({
        type: "beforeupdatePage",
      });
      // var newValue = a.length ? a[0].sourcePaht : "";
      this.updateSchema({
        type: "afterPage",
        value: {
          ["type"]: "image",
          ["value"]: {
            name:a[0].resName,
            uuid:a[0].uuid,
            url:a[0].sourcePaht
          },
        },
      });
    },
    deleteImage() {
      if (this.bgImg !== null && this.bgImg !== "") {
        this.updateSchema({
          type: "afterPage",
          value: {
            ["type"]: "image",
            ["value"]: "",
          },
        });
      }
    },
  },
};
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
    background: #ffffff;
    border: 1px solid #979797;
    font-size: 76px;
    color: #c6c6c6;
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
    background: #ececec;
    border: none;
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
