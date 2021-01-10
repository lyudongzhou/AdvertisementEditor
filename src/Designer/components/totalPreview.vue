<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-21 00:38:50
 * @LastEditTime: 2020-12-21 02:27:40
 * @Description: file content
-->
<template>
  <div v-if="isShow">
    <div v-if="previewTotal" class="totalPreviewContainer">
      <div class="leftContainer">
        <div class="leftContainer_inner" ref="container">
          <singlePagePreview
            ref="render"
            :style="caculateRenderScale"
            class="previewPage"
            @afterRender="onRender"
          ></singlePagePreview>
        </div>
      </div>
      <div class="rightContainer">
        <el-container>
          <el-main class="main">
            <el-tabs type="border-card" class="card">
              <el-tab-pane label="常用设置" style="display: flex">
                <div class="leftImg">
                  <img style="width: 100%; height: 100%" />
                </div>
                <div class="leftImg noborder">
                  <el-form class="nameConfig">
                    <el-form-item label="节目名称">
                      <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input type="textarea"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="bgmConfigContainer">
                  <div style="padding: 10px 0 10px 0">背景音乐</div>
                  <el-row :gutter="24" style="width: 100%; margin: 0">
                    <el-col :span="12"
                      ><div
                        class="selectBgm blackFont"
                        @click="handleBGMConfig"
                      >
                        背景音乐<i class="el-icon-headset icon"></i></div
                    ></el-col>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple">
                        <div
                          class="selectBgm blackFont"
                          @click="handleAutoPlay"
                        >
                          音乐自动播放
                          <div class="autoPlaySwitch">
                            {{ bgmConfig.autoPlay ? "ON" : "OFF" }}
                          </div>
                        </div>
                      </div></el-col
                    >
                  </el-row>
                  <div style="width: 100%; padding: 10px 12px 0 12px">
                    <el-row
                      style="
                        width: 100%;
                        border: 1px solid black;
                        border-radius: 4px;
                      "
                    >
                      <el-col :span="6"
                        ><div class="volumeConfig">背景音量</div></el-col
                      >
                      <el-col :span="13"
                        ><div class="grid-content bg-purple">
                          <div class="volumeConfig">
                            <el-slider v-model="bgmConfig.volume"></el-slider>
                          </div></div
                      ></el-col>
                      <el-col :span="5"
                        ><div class="volumeConfig">
                          <el-input
                            class="volumeInput"
                            v-model="volumeTemp"
                            @change="onVolumeChange"
                          >
                            <template slot="append">%</template></el-input
                          >
                        </div></el-col
                      >
                    </el-row>
                  </div>
                </div>
                <div class="pageContainer">
                  <div style="padding: 10px 0 10px 0">页码</div>
                  <el-row :gutter="24" style="width: 100%; margin: 10px 0 0 0">
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >页码位置</span
                        >
                        <el-select
                          v-model="pagingObj.position"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in pagingPositions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >页码样式</span
                        >
                        <el-select v-model="pagingObj.fmt" placeholder="请选择">
                          <el-option
                            v-for="item in pagingStyle"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24" style="width: 100%; margin: 10px 0 0 0">
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >页码颜色</span
                        >
                        <el-color-picker
                          v-model="pagingObj.color"
                        ></el-color-picker>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >背景颜色</span
                        >
                        <el-color-picker
                          v-model="pagingObj.bgColor"
                        ></el-color-picker>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24" style="width: 100%; margin: 10px 0 0 0">
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >页码字体</span
                        >
                        <el-select
                          v-model="pagingObj.family"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in fontFamilies"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="selectBgm">
                        <span style="margin: 10px 0 10px 0; display: block"
                          >字体大小</span
                        >
                        <el-input
                          v-model="sizeTemp"
                          @change="handleSizeChange"
                        ></el-input>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="翻页效果">
                <div
                  v-for="(item, index) in aAniType"
                  :key="index"
                  style="display: flex; padding: 10px"
                  class="changeType"
                  @click="handleType(index)"
                >
                  <div class="changeIconContainer">
                    <div
                      :class="fmtClass(item.icon, index)"
                      :style="fmtUrl()"
                    ></div>
                    <div>{{ item.text }}</div>
                  </div>
                </div>
                <div class="playContainer">
                  <div style="padding: 10px 0 10px 0">翻页设置</div>
                  <el-row
                    :gutter="24"
                    class="playSet"
                    style="width: 100%; margin: 10px 0 0 0; padding: 0 12px"
                  >
                    <el-col :span="8">
                      <el-select
                        v-model="changeTypeIndex2"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in changeTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <div
                        class="grid-content bg-purple"
                        @click="handleLoopTemp"
                      >
                        <div class="selectBgm blackFont">
                          循环播放
                          <div class="autoPlaySwitch">
                            {{ playConfig.loop ? "ON" : "OFF" }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div
                          class="selectBgm blackFont"
                          @click="handleChangeHint"
                        >
                          翻页提示
                          <div class="autoPlaySwitch">
                            {{ playConfig.changeHint ? "ON" : "OFF" }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="width: 100%; padding: 10px 12px 0 12px">
                    <el-row
                      style="
                        width: 100%;
                        border: 1px solid black;
                        border-radius: 4px;
                      "
                    >
                      <el-col :span="9"
                        ><div class="volumeConfig">默认页播放时长</div></el-col
                      >
                      <el-col :span="8"
                        ><div class="grid-content bg-purple">
                          <div class="volumeConfig">
                            <el-slider
                              v-model="playConfig.singlePagePlayTime"
                              :min="20"
                              :max="1800"
                            ></el-slider>
                          </div></div
                      ></el-col>
                      <el-col :span="7"
                        ><div class="volumeConfig">
                          <el-input
                            class="volumeInput"
                            v-model="singlePagePlayTimeTemp"
                            @change="handleSinglePlayTimeChange"
                          >
                            <template slot="append">秒</template></el-input
                          >
                        </div></el-col
                      >
                    </el-row>
                  </div>
                  <div style="width: 100%; padding: 10px 12px 0 12px">
                    <el-row
                      style="
                        width: 100%;
                        border: 1px solid black;
                        border-radius: 4px;
                      "
                    >
                      <el-col :span="9"
                        ><div class="volumeConfig">无触摸返回时长</div></el-col
                      >
                      <el-col :span="8"
                        ><div class="grid-content bg-purple">
                          <div class="volumeConfig">
                            <el-slider
                              v-model="playConfig.backTime"
                              :min="1"
                              :max="99999"
                            ></el-slider>
                          </div></div
                      ></el-col>
                      <el-col :span="7"
                        ><div class="volumeConfig">
                          <el-input
                            class="volumeInput"
                            v-model="backTimeTemp"
                            @change="handleBackTimeChange"
                          >
                            <template slot="append">秒</template></el-input
                          >
                        </div></el-col
                      >
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-main>
          <el-footer class="buttonContainer">
            <el-button @click="cancelChange">关闭</el-button>
          </el-footer>
        </el-container>
      </div>
    </div>
    <div v-if="!previewTotal" class="singlePreviewContainer">
      <div ref="container1" style="width: 100%; height: 100%">
        <singlePagePreview
          ref="render1"
          :style="caculateRenderScale1"
          class="previewPage"
          @afterRender="onRender1"
        ></singlePagePreview>
        <el-button
          v-if="!previewTotal"
          class="singleCloseBtn"
          @click="cancelChange"
          >关闭</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import singlePagePreview from "./preView";
import { mapMutations, mapState } from "../store";
import { FONTDEFINE } from "@/const";
import {
  UPDATE_BGM_BEFORE,
  UPDATE_BGM,
  UPDATE_BGM_AFTER,
} from "../constant/schema";
import icon from "../public/icon.png";
const map = {
  "0:vertical": 68,
  "0:horizontal": 70,
  "1:vertical": 72,
  "1:horizontal": 74,
  "2:vertical": 76,
  "2:horizontal": 78,
  "3:vertical": 80,
  "3:horizontal": 82,
  "4:vertical": 84,
  "4:horizontal": 86,
  "5:vertical": 88,
  "5:horizontal": 90,
  "6:vertical": 92,
  "6:horizontal": 94,
  "7:vertical": 96,
  "7:horizontal": 98,
};
const mapInverse = {
  68: [0, "vertical"],
  70: [0, "horizontal"],
  72: [1, "vertical"],
  74: [1, "horizontal"],
  76: [2, "vertical"],
  78: [2, "horizontal"],
  80: [3, "vertical"],
  82: [3, "horizontal"],
  84: [4, "vertical"],
  86: [4, "horizontal"],
  88: [5, "vertical"],
  90: [5, "horizontal"],
  92: [6, "vertical"],
  94: [6, "horizontal"],
  96: [7, "vertical"],
  98: [7, "horizontal"],
};
export default {
  methods: {
    ...mapMutations(["setPreviewState", "updateSchema"]),
    commit() {
      this.isShow = false;
    },
    handlePreview() {
      this.setPreviewState({ previewTotal: true, previewing: true });
    },
    handleChangeHint() {
      if (this.isMounted) {
        this.playConfig.changeHint = !this.playConfig.changeHint;
      }
    },
    handleLoopTemp() {
      if (this.isMounted) {
        this.playConfig.loop = !this.playConfig.loop;
      }
    },
    onSwitchList(id) {
      this.select = id;
    },
    commitChange() {
      this.setPreviewState({ previewing: false });
    },
    cancelChange() {
      this.setPreviewState({ previewing: false });
    },
    onRender1() {
      this.$nextTick(() => {
        let pageBound = this.$refs.render1.$el.getBoundingClientRect();
        let containerBound = this.$refs.container1.getBoundingClientRect();
        this.pageInfo1.previewWidth = pageBound.width;
        this.pageInfo1.previewHeight = pageBound.height;
        this.pageInfo1.containerWidth = containerBound.width;
        this.pageInfo1.containerHeight = containerBound.height;
      });
    },
    onRender() {
      this.$nextTick(() => {
        let pageBound = this.$refs.render.$el.getBoundingClientRect();
        let containerBound = this.$refs.container.getBoundingClientRect();
        this.pageInfo.previewWidth = pageBound.width;
        this.pageInfo.previewHeight = pageBound.height;
        this.pageInfo.containerWidth = containerBound.width;
        this.pageInfo.containerHeight = containerBound.height;
      });
    },
    fmtUrl() {
      return {
        backgroundImage: `url(${icon})`,
      };
    },
    fmtClass(text, index) {
      return `changeIcon ${text} ${
        index === this.changeTypeIndex ? "active" : ""
      }`;
    },
    handleBGMConfig() {
      this.$event.emit("openUploadWin", {
        onSelect: this.onUpdateBGM.bind(this),
        aSelectType: ["audio"],
        multi: false,
        title: "音频",
      });
    },
    onUpdateBGM(a) {
      if (!a || a.length === 0) {
        return;
      }
      this.updateSchema({
        type: UPDATE_BGM,
        value: {
          "container.bgm.src": a[0].resUrl,
        },
      });
    },
    handleAutoPlay() {
      this.bgmConfig.autoPlay = !this.bgmConfig.autoPlay;
    },
    onVolumeChange(value) {
      value = parseInt(value);
      if (Number.isInteger(value) && value <= 100 && value >= 0) {
        this.bgmConfig.volume = value;
        this.volumeTemp = value;
      } else {
        this.volumeTemp = this.bgmConfig.volume;
      }
    },
    handleSinglePlayTimeChange(value) {
      value = parseInt(value);
      if (Number.isInteger(value) && value <= 18000 && value >= 20) {
        this.playConfig.singlePagePlayTime = value;
        this.singlePagePlayTimeTemp = value;
      } else {
        this.singlePagePlayTimeTemp = this.playConfig.singlePagePlayTime;
      }
    },
    handleBackTimeChange(value) {
      value = parseInt(value);
      if (Number.isInteger(value) && value <= 99999 && value >= 1) {
        this.playConfig.backTime = value;
        this.backTimeTemp = value;
      } else {
        this.playConfig.singlePagePlayTime = this.playConfig.backTime;
      }
    },
    handleSizeChange(value) {
      value = parseInt(value);
      if (Number.isInteger(value) && value >= 0) {
        this.pagingObj.size = value;
      } else {
        this.sizeTemp = this.pagingObj.size;
      }
    },
    handleType(index) {
      this.changeTypeIndex = index;
    },
    storeStyle(style) {
      this.pageInfo.style = style;
    },
    storeStyle1(style) {
      this.pageInfo1.style = style;
    },
  },
  watch: {
    changeTypeIndex() {
      if (this.isMounted) {
        this.updateSchema({
          type: UPDATE_BGM,
          value: {
            "change.type": this.changeTypeSchema,
          },
        });
      }
    },
    changeTypeIndex2() {
      if (this.isMounted) {
        this.updateSchema({
          type: UPDATE_BGM,
          value: {
            "change.type": this.changeTypeSchema,
          },
        });
      }
    },
    pagingObj: {
      deep: true,
      handler(value) {
        if (this.isMounted) {
          this.updateSchema({
            type: UPDATE_BGM,
            value: {
              "container.paging": value,
            },
          });
        }
      },
    },
    bgmConfig: {
      deep: true,
      handler(value) {
        if (this.isMounted) {
          this.volumeTemp = value.volume;
          this.updateSchema({
            type: UPDATE_BGM,
            value: {
              "container.bgm.autoPlay": value.autoPlay,
              "container.bgm.volume": value.volume,
            },
          });
        }
      },
    },
    playConfig: {
      deep: true,
      handler(value) {
        if (this.isMounted) {
          this.singlePagePlayTimeTemp = value.singlePagePlayTime;
          this.backTimeTemp = value.backTime;
          this.updateSchema({
            type: UPDATE_BGM,
            value: {
              "change.loop": value.loop,
              "change.singlePagePlayTime": value.singlePagePlayTime,
              "change.changeHint": value.changeHint,
              "change.backTime": value.backTime,
            },
          });
        }
      },
    },
    previewing(data) {
      this.isShow = data;
      if (data) {
        this.updateSchema({
          type: UPDATE_BGM_BEFORE,
          value: {},
        });
        this.bgmConfig.autoPlay = this.schema.container.bgm.autoPlay;
        this.bgmConfig.volume = this.schema.container.bgm.volume;
        // this.volumeTemp = this.bgmConfig.volume;
        this.sizeTemp = this.pagingObj.size;
        let schema = this.schema.container.paging;
        Object.keys(schema).forEach((ele) => {
          this.pagingObj[ele] = schema[ele];
        });
        let change = this.schema.change;
        Object.keys(change).forEach((ele) => {
          if (ele !== "type") {
            this.playConfig[ele] = change[ele];
          }
        });
        this.changeTypeIndex = mapInverse[this.schema.change.type][0];
        this.changeTypeIndex2 = mapInverse[this.schema.change.type][1];
        this.isMounted = true;
      } else {
        this.isMounted = false;
        this.updateSchema({
          type: UPDATE_BGM_AFTER,
          value: {},
        });
      }
    },
  },
  computed: {
    ...mapState(["previewing", "previewTotal", "schema"]),
    changeTypeSchema() {
      return map[`${this.changeTypeIndex}:${this.changeTypeIndex2}`];
    },
    caculateRenderScale1() {
      let {
        previewWidth,
        previewHeight,
        containerWidth,
        containerHeight,
      } = this.pageInfo1;
      if (this.pageInfo1.style) {
        return this.pageInfo1.style;
      }
      let scaleX = containerWidth / previewWidth;
      let scaleY = containerHeight / previewHeight;
      let scale = Math.min(scaleX, scaleY);
      if (!scale) {
        return;
      }
      let c = scaleX > scaleY;
      if (c) {
        this.storeStyle1({
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(${
            (0.5 * containerWidth) / scale - 0.5 * previewWidth
          }px,0px)`,
        });
      } else {
        this.storeStyle1({
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(0px,${
            (0.5 * containerHeight) / scale - 0.5 * previewHeight
          }px)`,
        });
      }
      return this.pageInfo1.style;
    },
    caculateRenderScale() {
      let {
        previewWidth,
        previewHeight,
        containerWidth,
        containerHeight,
      } = this.pageInfo;
      if (this.pageInfo.style) {
        return this.pageInfo.style;
      }
      let scaleX = containerWidth / previewWidth;
      let scaleY = containerHeight / previewHeight;
      let scale = Math.min(scaleX, scaleY);
      if (!scale) {
        return;
      }
      let c = scaleX > scaleY;
      if (c) {
        this.storeStyle({
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(${
            (0.5 * containerWidth) / scale - 0.5 * previewWidth
          }px,0px)`,
        });
      } else {
        this.storeStyle({
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(0px,${
            (0.5 * containerHeight) / scale - 0.5 * previewHeight
          }px)`,
        });
      }
      return this.pageInfo.style;
    },
  },
  components: { singlePagePreview },
  data() {
    return {
      sizeTemp: "",
      singlePagePlayTime: "",
      isShow: false,
      select: 1,
      volumeTemp: "",
      singlePagePlayTimeTemp: "",
      backTimeTemp: "",
      bgmConfig: {
        autoPlay: false,
        volume: 0,
      },
      playConfig: {
        loop: true,
        singlePagePlayTime: 6000,
        changeHint: true,
        backTime: 6000,
      },
      value: "",
      switchList: [
        {
          id: 1,
          name: "常用设置",
        },
        {
          id: 2,
          name: "翻页效果",
        },
      ],
      changeTypes: [
        {
          label: "横向翻页",
          value: "horizontal",
        },
        {
          label: "纵向翻页",
          value: "vertical",
        },
      ],
      pagingPositions: [
        { label: "隐藏", value: "hide" },
        { label: "底部居中", value: "center&bottom" },
        { label: "顶部居中", value: "center&top" },
        { label: "左上角", value: "left&top" },
        { label: "左下角", value: "left&bottom" },
        { label: "右上角", value: "right&top" },
        { label: "右下角", value: "right&bottom" },
      ],
      aAniType: [
        { icon: "cvbe", text: "立体旋转" },
        { icon: "move", text: "普通" },
        { icon: "fade", text: "渐显" },
        { icon: "cover", text: "覆盖" },
        { icon: "carousel", text: "层叠" },
        { icon: "scale", text: "覆盖缩小" },
        { icon: "glue", text: "缩放层叠" },
        { icon: "push", text: "扇形翻页" },
      ],
      pagingStyle: [
        {
          label: "1/5",
          value: "${CURRENT}/${TOTAL}",
        },
        {
          label: "第1页，总共5页",
          value: "第${CURRENT}页，总共${TOTAL}页",
        },
      ],
      pagingObj: {
        position: "center&bottom",
        fmt: "${CURRENT}/${TOTAL}",
        color: "#E41C1C",
        size: 20,
        family: "",
        bgColor: "#000000",
      },
      fontFamilies: FONTDEFINE,
      volume: 10,
      pageInfo: {
        previewWidth: 0,
        previewHeight: 0,
        containerWidth: 0,
        containerHeight: 0,
      },
      pageInfo1: {
        previewWidth: 0,
        previewHeight: 0,
        containerWidth: 0,
        containerHeight: 0,
      },
      changeTypeIndex: 0,
      changeTypeIndex2: "horizontal",
    };
  },
  mounted() {},
};
</script>

<style lang="less">
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.singleCloseBtn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.singlePreviewContainer {
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
}
.totalPreviewContainer {
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  .leftContainer {
    margin-left: -400px;
    float: left;
    width: 100%;
    display: flex;
    height: 100%;
    padding: 30px;
    .previewPage {
      // transform: translate(-50%, -50%);
      // left: 50%;
      // top: 50%;
    }
  }
  .rightContainer {
    width: 400px;
    float: right;
    display: flex;
    height: 100%;
    background: #777777;
    padding: 20px;
    .buttonContainer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main {
      padding: 0;
      .bgmConfigContainer {
        width: 100%;
        border: 0;
        padding: 0 0 10px 0;
      }
      .pageContainer {
        width: 100%;
        border: 0;
      }
      .playContainer {
        width: 100%;
        border: 0;
        .playSet {
          .el-col {
            padding: 0 !important;
          }
        }
      }
      .leftImg {
        display: flex;
        width: 175px;
        height: 175;
        border: 1px solid white;
      }
      .leftImg.noborder {
        border: 0;
      }
      .card {
        background: transparent;
        width: 100%;
        border: 0;
      }
      .card > .el-tabs__header {
        background: #424242;
        border: 0;
        /deep/ .el-tabs__nav {
          width: 100%;
        }
        /deep/ .el-tabs__item {
          background: transparent;
          width: 50%;
          border: 0;
        }
        /deep/ .el-tabs__item.is-active {
          background: #777777;
          color: white;
        }
        /deep/ .el-tabs__item:hover {
          color: white;
        }
      }
      .card > .el-tabs__content {
        padding: 10px 0 0 0;
        .el-tab-pane {
          display: flex;
          flex-wrap: wrap;
        }
      }
      /deep/.nameConfig {
        .el-form-item {
          width: 100%;
          padding: 0 10px;
          margin: 0;
          .el-form-item__label {
            float: left;
          }
        }
      }
    }
  }
  .leftContainer_inner {
    margin-left: 400px;
    width: 100%;
    height: 100%;
    position: relative;
  }
}
.volumeInput {
  .el-input-group__append {
    padding: 0;
  }
}
.volumeConfig {
  // padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: transparent;
  width: 100%;
  height: 40px;
  cursor: pointer;
  position: relative;
  .el-slider {
    width: 100%;
    margin: 10px;
  }
}
.blackFont {
  color: black;
}
.changeType {
  .changeIconContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 100px;
  }
  .changeIcon {
    width: 60px;
    height: 60px;
    transform: rotateZ(-90deg);
  }
  .changeIcon:hover {
    background: #424242;
    cursor: pointer;
  }
  .changeIcon.active {
    background: #424242;
    cursor: pointer;
  }
  .cvbe {
    background-position-y: 0 !important;
  }
  .move {
    background-position-y: -480px !important;
  }
  .fade {
    background-position-y: -60px !important;
  }
  .cover {
    background-position-y: -720px !important;
  }
  .carousel {
    background-position-y: -240px !important;
  }
  .scale {
    background-position-y: -300px !important;
  }
  .glue {
    background-position-y: -180px !important;
  }
  .push {
    background-position-y: -120px !important;
  }
}
.selectBgm {
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: white;
  width: 100%;
  height: 40px;
  cursor: pointer;
  position: relative;
  .autoPlaySwitch {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 22px;
    text-align: center;
  }
  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
