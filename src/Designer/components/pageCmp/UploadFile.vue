<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
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
      <el-main class="dialogMiddle" style="height: 83%">
        <el-container>
          <el-aside width="150px">
            <el-tabs
              tab-position="left"
              style="height: 100%"
              class="uploadFileTab"
              v-model="resourceTyp"
            >
              <el-tab-pane
                v-for="(tab, index) in currentTabs"
                :key="index"
                :name="index + ''"
              >
                <span slot="label"
                  ><i class="el-icon-date"></i>{{ tab.text }}</span
                >
              </el-tab-pane>
            </el-tabs></el-aside
          ><el-main>
            <vue-select-image
              ref="aaa"
              :dataImages="aResource"
              @onselectimage="onSelectImage"
              @onselectmultipleimage="onSelectImage"
              :is-multiple="multi"
              :h="'120px'"
              :w="'140px'"
              :useLabel="true"
              :load="loadResource"
              :isLoading="isLoading"
              :noMore="noMore"
              :isDisabled="cannotLoad"
            >
            </vue-select-image></el-main
        ></el-container>
      </el-main>
      <el-footer style="height: 10%; margin-top: 10px"
        ><el-button @click="handleClose">取消</el-button
        ><el-button style="height: 100%" @click="commit"
          >确定</el-button
        ></el-footer
      >
    </el-container>
  </el-dialog>
</template>

<script>
import VueSelectImage from "./FileDisplay";
// add stylesheet
// require("vue-select-image/dist/vue-select-image.css");
import dataMixin from "../../mixin/pagingResourceMixin";
import fileIcon from "../../public/file.jpg";
export default {
  components: { VueSelectImage },
  mixins: [dataMixin],
  data() {
    return {
      dialogVisible: false,
      multi: false,
      title: "标题",
      tabs: [
        { icon: "", text: "图片", resType: 1 },
        { icon: "", text: "视频", resType: 2 },
        { icon: "", text: "音频", resType: 3 },
        { icon: "", text: "文档", resType: 4 },
      ],
      currentTabs: [],
      resourceTyp: 0,
      searchText: "",
      acceptFile: "*",
      isStarting: true,
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
    // this.loadResource();
  },
  created() {
    this.url = "/res/get";
    // this.loadResource();
  },
  methods: {
    commit() {
      this.onSelect && this.onSelect(this.aResult);
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
      var arr = [];
      a.forEach(ele=>{
        arr.push(JSON.parse(JSON.stringify(ele.payload)));
      });
      this.aResult = arr;
    },
    fmtRes(res) {
      const { resName, resType, resUrl, resId } = res;
      return {
        id: resId,
        src: resType === 1 ? resUrl : fileIcon,
        alt: resName,
        payload: res,
      };
    },
    //开始选择，配置参数
    start({ onSelect, aSelectType, multi, title }) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["aaa"].reset();
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
    //数据加载
  },
};
</script>

<style lang="less" scope>
@deep: ~">>>";

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
    outline: none;
    border: 1px solid #1391ff;
    box-sizing: border-box;
    text-align: center;
    line-height: 45px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #1391ff;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1391ff;
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
    width: 45px;
    height: 45px;
    background: #fe971e;
    border-radius: 10px;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    line-height: 45px;
  }
}
.resourceDialog {
  height: 70%;
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
      }
      .el-footer {
        padding: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        .el-button {
          height: 100%;
          width: 130px;
          line-height: 100%;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>