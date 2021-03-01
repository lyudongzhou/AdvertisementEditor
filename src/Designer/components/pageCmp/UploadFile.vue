<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="75%"
    :modal-append-to-body="false"
    :center="true"
    custom-class="resourceDialog"
    :before-close="handleClose"
  >
    <el-container class="dialogContainer">
      <el-header class="dialogHeader" style="height: 10%">
        <label class="upload_text pub_btn" for="avatar"
          ><span style="line-height: 100%">上传</span></label
        >
        <input
          type="file"
          class="upload_input"
          id="avatar"
          name="avatar"
          @change="uploadImg"
          :accept="acceptFile" />
        <el-input
          style="margin-left: auto"
          placeholder="请输入文件名"
          v-model="searchText"
        ></el-input
        ><span class="el-icon-search search_icon" @click="onSearch"></span
      ></el-header>
      <el-main class="dialogMiddle" style="height: 70%">
        <el-container>
          <el-aside width="150px">
            <el-tabs
              tab-position="left"
              style="height: 100%"
              class="uploadFileTab"
              v-model="resourceTyp">
              <el-tab-pane
                v-for="(tab, index) in currentTabs"
                :key="index"
                style="padding:0px;"
                :name="index + ''">
                <p class="img_type" slot="label">
                  <img :src="tab.icon"/>
                  <span class="marginLeft">{{ tab.text }}</span>
                </p>
              </el-tab-pane>
            </el-tabs>
          </el-aside>
          <el-main>
            <vue-select-image
              ref="selectCmp"
              :dataImages="aResource"
              @onselectimage="onSelectImage"
              @onselectmultipleimage="onSelectImage"
              @onselectmultipleimagedelete="deleteSelect"
              :is-multiple="multi"
              :h="'120px'"
              :w="'140px'"
              :useLabel="true"
              :load="loadResource"
              :isLoading="isLoading"
              :noMore="noMore"
              :isDisabled="cannotLoad"
              :selectedImages="selectImages"
            >
            </vue-select-image></el-main
        ></el-container>
      </el-main>
      <el-footer
        style="height: 110px; width: 100%; display: block; overflow: auto"
        v-if="multi"
        ><div
          v-for="(item, index) in selectImages"
          :key="item.id"
          style="
            display: inline-block;
            width: 100px;
            height: 100px;
            position: relative;
            margin: 5px 5px;
          "
        >
          <img :src="item.src" style="width: 100%; height: 70%" />
          <label style="width: 100%; height: 30%">{{ item.alt }}</label>
          <i
            class="el-icon-delete deleteIcon"
            @click="onClickDeleteSelect(index)"
          ></i></div
      ></el-footer>
      <el-footer style="height: 10%; margin-top: 10px; bottom: 0">
        <button class="btn_cancel" @click="handleClose">取消</button>
        <button class="btn_correct" @click="commit">确定</button>
      </el-footer>
    </el-container>
  </el-dialog>
</template>

<script>
import VueSelectImage from "./FileDisplay";
// add stylesheet
// require("vue-select-image/dist/vue-select-image.css");
import dataMixin from "../../mixin/pagingResourceMixin";
import fileIcon from "../../public/file.jpg";
import image from "../../public/58.png";
import music from "../../public/music.png";

export default {
  components: { VueSelectImage },
  mixins: [dataMixin],
  data() {
    return {
      dialogVisible: false,
      multi: false,
      title: "标题",
      tabs: [
        { icon: music, text: "图片", resType: 1 },
        { icon: music, text: "视频", resType: 2 },
        { icon: music, text: "音频", resType: 3 },
        { icon: music, text: "文档", resType: 4 },
      ],
      currentTabs: [],
      resourceTyp: 0,
      searchText: "",
      acceptFile: "*",
      isStarting: true,
      selectImages: [],
    };
  },
  watch: {
    resourceTyp() {
      if (this.isStarting) {
        return;
      }
      this.resetType();
    },
  },
  mounted() {
    this.typeMap = {
      image: {
        tabsIndex: 0,
        accept: "image/png, image/jpeg",
        resType: 1,
      },
      video: {
        tabsIndex: 1,
        accept: "video/mp4",
        resType: 2,
      },
      audio: {
        tabsIndex: 2,
        accept: "audio/mp3",
        resType: 3,
      },
      document: {
        tabsIndex: 3,
        accept: "application/pdf",
        resType: 4,
      },
    };
    this.$event.on("openUploadWin", (config) => {
      this.cancelOpen();
      this.start(config);
    });
    // this.start({
    //   onSelect: (a) => {
    //     console.log(a);
    //   },
    //   aSelectType: ["image", "audio", "video"],
    //   multi: false,
    //   title: "背景图片",
    // });
    // this.loadResource();
  },
  created() {
    this.url = "/res/get";
    this.imageIcon = image;
    // this.loadResource();
  },
  methods: {
    commit() {
      this.onSelect &&
        this.onSelect(this.muilti ? this.selectImages : this.aResult);
      this.closeOpen();
    },
    resetType() {
      let type = this.resourceTyp;
      this.sortConfig.resType = this.currentTabs[type].para.resType;
      this.acceptFile = this.currentTabs[type].para.accept;
      this.reset();
      this.loadResource();
    },
    uploadImg(e) {
      let formData = new FormData(),
        file = e.target.files[0];
      formData.append("file", file);
      formData.append("type", 1);
      formData.append("cateforyId", 1);
      formData.append("fileName", file.name);
      formData.append("targetPath","/");
      formData.append("fileSize",file.size);
      this.$axios
        .post("/res/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.reset();
          this.loadResource();
        });
    },
    onSearch() {
      this.sortConfig.searchText = this.searchText;
      this.reset();
      this.loadResource();
    },
    onSelectImage(a) {
      if (!(a instanceof Array)) {
        a = [a];
      }
      a.forEach((ele) => {
        let dataImage = this.selectImages.find((data) => {
          return data.id === ele.id;
        });
        if (!dataImage) {
          this.selectImages.push(ele);
        }
      });
      // this.selectImages.push.apply();
      var arr = [];
      a.forEach((ele) => {
        arr.push(JSON.parse(JSON.stringify(ele.payload)));
      });
      this.aResult = arr;
    },
    deleteSelect(ele) {
      let dataImage = this.selectImages.find((data) => {
        return data.id === ele.id;
      });
      this.selectImages.splice(this.selectImages.indexOf(dataImage), 1);
    },
    fmtRes(res) {
      const { resName, resType, sourcePaht, resId } = res;
      console.log(resId);
      return {
        id: resId,
        src: resType === 1 ? sourcePaht : resType === 2 ? res.thumbnail : fileIcon ,
        alt: resName,
        payload: res,
      };
    },
    //开始选择，配置参数
    start({ onSelect, aSelectType, multi, title }) {
      this.dialogVisible = true;
      while (this.selectImages.length) {
        this.selectImages.pop();
      }
      this.$nextTick(() => {
        this.$refs["selectCmp"].reset();
        this.aResult = [];
        this.isStarting = true;
        this.searchText = "";
        this.onSelect = onSelect;
        this.calculateTabs(aSelectType);
        this.multi = multi;
        this.title = title;
        this.resourceTyp = "0";
        this.isStarting = false;
        this.resetType();
      });
    },
    calculateTabs(aSelectType) {
      this.currentTabs.splice(0, this.currentTabs.length);
      aSelectType.forEach((ele) => {
        let o = JSON.parse(
          JSON.stringify(this.tabs[this.typeMap[ele].tabsIndex])
        );
        o.para = this.typeMap[ele];
        this.currentTabs.push(o);
      });
    },
    cancelOpen() {
      if (this.onSelect) {
        this.onSelect(null);
        this.onSelect = null;
      }
    },
    closeOpen() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.cancelOpen();
      this.closeOpen();
    },
    onClickDeleteSelect(idx) {
      let item = this.selectImages.splice(idx, 1);
      this.$refs["selectCmp"].removeSelect(item[0].id);
    },
    //数据加载
  },
};
</script>

<style lang="less" scope>
@deep: ~">>>";
.marginLeft{
  margin-left: 30px;
}
.deleteIcon {
  cursor: pointer;
  background: white;
  position: absolute;
  right: 0px;
  top: 0px;
}
.deleteIcon:hover {
  background: #cccccc;
}
.el-tabs--left .el-tabs__item.is-left {
  text-align: left !important;
}
.uploadFileTab.el-tabs--left .el-tabs__header.is-left {
  float: right;
  margin: 0;
  width: 100%;
}
.uploadFileTab {
  @{deep} .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
  }
}
.dialogHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  .upload_input {
    display: none;
  }
  .pub_btn {
    width: 130px;
    height: 45px;
    background: #1391FF;
    border-radius: 10px;
    outline: none;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
  }
  .upload_text {
    display: inline-block;
  }
  .el-input__inner {
    background: white;
    color: black;
    border: 1px solid #cdcdcd;
  }
  .search_icon {
    width: 40px;
    height: 40px;
    background: #fe971e;
    border-radius: 10px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    margin-left: 10px;
  }
}
.resourceDialog {
  height: 80%;
  padding-top: 0;
}
.el-header {
  .el-input {
    width: 200px;
  }
}
.dialogMiddle {
  .el-container {
    height: 100%;
  }
}
.resourceDialog {
  .el-dialog__header {
    height: 10%;
  }
  .el-dialog__body {
    padding-top: 0;
    height: 90%;
    .dialogContainer {
      height: 100%;
      .el-header {
        height: 10%;
        padding: 0 0 10px 0;
      }
      .el-main {
        padding: 0;
        .img_type {
          display: flex;
          align-items: center;
          // display: inline-block;
          // width: 130px;
          // height: 45px;
          // background: #FFFFFF;
          // border-radius: 10px;
          // border: 1px solid #1391FF;
          // font-size: 16px;
          // font-family: PingFangSC-Regular, PingFang SC;
          // font-weight: 400;
          // color: #1391FF;
          // text-align: center;
        }
      }
      .el-footer {
        padding: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .btn_cancel {
          width: 130px;
          height: 45px;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid #1391FF;
          margin-right: 10px;
          color: #1391FF;
          outline: none;
          cursor: pointer;
        }
        .btn_correct {
          width: 130px;
          height: 45px;
          background: #1391FF;
          border-radius: 10px;
          color: #FFF;
          outline: none;
          cursor: pointer;
          border: 0;
        }
      }
    }
  }
}
</style>
