<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-21 00:38:50
 * @LastEditTime: 2020-12-21 02:27:40
 * @Description: file content
-->
<template>
  <div v-if="isShow" class="totalPreviewContainer">
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
                    ><div class="selectBgm blackFont">
                      背景音乐<i class="el-icon-headset icon"></i></div
                  ></el-col>
                  <el-col :span="12"
                    ><div class="grid-content bg-purple">
                      <div class="selectBgm blackFont">
                        音乐自动播放
                        <div class="autoPlaySwitch">ON</div>
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
                          <el-slider v-model="volume"></el-slider>
                        </div></div
                    ></el-col>
                    <el-col :span="5"
                      ><div class="volumeConfig">
                        <el-input class="volumeInput">
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
                      <el-select v-model="value" placeholder="请选择">
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
                      <el-select v-model="value" placeholder="请选择">
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
                      <el-color-picker></el-color-picker>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="selectBgm">
                      <span style="margin: 10px 0 10px 0; display: block"
                        >背景颜色</span
                      >
                      <el-color-picker></el-color-picker>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" style="width: 100%; margin: 10px 0 0 0">
                  <el-col :span="12">
                    <div style="selectBgm">
                      <span style="margin: 10px 0 10px 0; display: block"
                        >页码字体</span
                      >
                      <el-select v-model="value" placeholder="请选择">
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
                      <el-input></el-input>
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
              >
                <div class="changeIconContainer">
                  <div :class="fmtClass(item.icon)" :style="fmtUrl()"></div>
                  <div>{{ item.text }}</div>
                </div>
              </div>
              <div class="playContainer">
                <div style="padding: 10px 0 10px 0">翻页设置</div>
                <el-row
                  :gutter="24"
                  class="playSet"
                  style="width: 100%; margin: 10px 0 0 0;padding:0 12px"
                >
                  <el-col :span="8">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in pagingPositions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <div class="selectBgm blackFont">
                        循环播放
                        <div class="autoPlaySwitch">ON</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <div class="selectBgm blackFont">
                        翻页提示
                        <div class="autoPlaySwitch">ON</div>
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
                    <el-col :span="10"
                      ><div class="grid-content bg-purple">
                        <div class="volumeConfig">
                          <el-slider v-model="volume"></el-slider>
                        </div></div
                    ></el-col>
                    <el-col :span="5"
                      ><div class="volumeConfig">
                        <el-input class="volumeInput">
                          <template slot="append">%</template></el-input
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
                    <el-col :span="10"
                      ><div class="grid-content bg-purple">
                        <div class="volumeConfig">
                          <el-slider v-model="volume"></el-slider>
                        </div></div
                    ></el-col>
                    <el-col :span="5"
                      ><div class="volumeConfig">
                        <el-input class="volumeInput">
                          <template slot="append">%</template></el-input
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
          <el-button>确定</el-button>
          <el-button>取消</el-button>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import singlePagePreview from "./preView";
import { mapMutations, mapState } from "../store";
import { FONTDEFINE } from "@/const";
import icon from "../public/icon.png";
export default {
  methods: {
    ...mapMutations(["setPreviewState"]),
    handlePreview() {
      this.setPreviewState({ previewTotal: true, previewing: true });
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
    onRender() {
      this.$nextTick(() => {
        let pageBound = this.$refs.render.$el.getBoundingClientRect();
        let containerBound = this.$refs.container.getBoundingClientRect();
        this.pageInfo.previewWidth = pageBound.width;
        this.pageInfo.previewHeight = pageBound.height;
        this.pageInfo.containerWidth = containerBound.width;
        this.pageInfo.containerHeight = containerBound.height;
        console.log(this.pageInfo);
        // console.log(this.$refs.render);
      });
    },
    fmtUrl() {
      return {
        backgroundImage: `url(${icon})`,
      };
    },
    fmtClass(text) {
      return `changeIcon ${text}`;
    },
  },
  watch: {
    previewing(data) {
      this.isShow = data;
    },
  },
  computed: {
    ...mapState(["previewing", "previewTotal"]),
    caculateRenderScale() {
      let {
        previewWidth,
        previewHeight,
        containerWidth,
        containerHeight,
      } = this.pageInfo;
      let scaleX = containerWidth / previewWidth;
      let scaleY = containerHeight / previewHeight;
      let scale = Math.min(scaleX, scaleY);
      let c = scaleX > scaleY;
      if (c) {
        return {
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(${
            (0.5 * containerWidth) / scale - 0.5 * previewWidth
          }}px,0px)`,
        };
      } else {
        return {
          "transform-origin": "0 0",
          transform: `scale(${scale}) translate(0px,${
            (0.5 * containerHeight) / scale - 0.5 * previewHeight
          }px)`,
        };
      }
    },
  },
  components: { singlePagePreview },
  data() {
    return {
      isShow: false,
      select: 1,
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
          value: function (current, total) {
            return `${current}/${total}`;
          },
        },
        {
          label: "第1页，总共5页",
          value: function (current, total) {
            return `第${current}页，总共${total}页`;
          },
        },
      ],
      fontFamilies: FONTDEFINE,
      volume: 10,
      pageInfo: {
        previewWidth: 0,
        previewHeight: 0,
        containerWidth: 0,
        containerHeight: 0,
      },
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
        width: 179px;
        height: 179px;
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
