<script>
import render from "../../Render/render.vue";
import { mapState, mapGetters, mapMutations } from "../store";
import { getPropByPath } from "../../Utils/utils";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import editorWin from "./EditorWindow";
import RotateOperate from "./RotateOperate";
import Vue from "vue";
import {
  CHANGE_SCALE,
  UPDATE_CANVAS_SIZE,
  UPDATE_SELECT_INFO,
} from "../constant/event";
import { CONTENT_OFFSET, GRID_ADSORBENT_VALUE } from "../constant/base";
import {
  BEFORE_UPDATE_COMPONENT_SIZE,
  UPDATING_COMPONENT_SIZE,
  AFTER_UPDATE_COMPONENT_SIZE,
  BEFORE_UPDATE_COMPONENT_POSITION,
  UPDATING_COMPONENT_POSITION,
  AFTER_UPDATE_COMPONENT_POSITION,
  DELETE_COMPONENT,
  UPDATE_INDEX_TO_BOTTOM,
  UPDATE_INDEX_TO_TOP,
  UPDATE_COMPONENT_PROPS
} from "../constant/schema";
import schemaMixin from "../mixin/schemaMixin";

const getScaleValue = (originValue, maxValue) => {
  if (maxValue >= originValue) {
    return 1;
  }
  return maxValue / originValue;
};

const getCenterPositionValue = (containerValue, originValue, scaleValue) =>
  (containerValue - originValue * scaleValue) / 2;

const warpUnit = (value, unit = "px") => `${value}${unit}`;

export default {
  components: {
    render,
    VueDraggableResizable,
    editorWin,
    RotateOperate,
  },
  created() {
    // scale变化，选择款需要同步变化
    this.$event.on(CHANGE_SCALE, (addition) => {
      // todo 弹框处理
      const newScale = this.scaleValue + addition;
      if (newScale < 0.15 || newScale > 1.5) {
        return;
      }
      this.scaleState = newScale;
      this.updateSelectItemInfo();
    });
    this.$event.on(UPDATE_SELECT_INFO, () => {
      this.updateSelectItemInfo();
    });
    this.$event.on(UPDATE_CANVAS_SIZE, () => {
      this.scaleState = null;
    });
  },
  mixins: [schemaMixin],
  mounted() {
    const workspaceDom = this.$refs.workspace;
    this.workspaceWidth = workspaceDom.offsetWidth;
    this.$event.on('currentComponentOperate', (fn) => {
      fn(this.$refs.render.getCmp(this.currentComponentId));
      // console.log(fn,this.$refs.render.getCmp(this.currentComponentId));
    });
    document.addEventListener("mousemove", this.mousemove, true);
    const { height, width } = this.$refs.workspace.getBoundingClientRect();
    this.containerInfo = { height, width };
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.mousemove, true);
  },
  data() {
    return {
      scaleState: null,
      selectItemInfo: null,
      dragging: false,
      resizing: false,
      workspaceWidth: 0,
      rotateActive: false,
      lastLeft: 0,
      lastTop: 0,
      highlightState: false,
      highlightGuideConfig: {
        ver: {},
        hoz: {},
      },
      containerInfo: {},
      //        selectItemContainerStyle: {},
    };
  },
  computed: {
    ...mapState([
      "schema",
      "currentComponentId",
      "opened",
      "currentPageId",
      "copyComponent",
    ]),
    ...mapGetters([
      "currentComponent",
      "isComponentLocked",
      "gridGuideHozSet",
      "gridGuideVerSet",
    ]),
    selectItemContainerStyle() {
      const workspaceDom = this.$refs.workspace;
      return {
        width: workspaceDom.offsetWidth / this.scaleValue + "px",
        height: workspaceDom.offsetHeight / this.scaleValue + "px",
      };
    },
    isCurrentComponentLocked() {
      return this.isComponentLocked(this.currentComponentId);
    },
    selectItemLayoutInfo() {
      const { top, left, width, height } = getPropByPath(
        this.selectItemInfo,
        "position",
        {}
      );
      return {
        //          y: Math.ceil(top),
        //          x: Math.ceil(left),
        //          w: Math.ceil(width),
        //          h: Math.ceil(height),
        y: top,
        x: left,
        w: width,
        h: height,

        rotation:
          this.currentComponent && this.currentComponent.layoutConfig.rotation,
      };
    },
    scaleValue() {
      if (this.scaleState) {
        return this.scaleState;
      } else {
        return this.getInitialScale();
      }
    },
    containerWidth() {
      return getPropByPath(this.schema, "container.width", 0);
    },
    containerHeight() {
      return getPropByPath(this.schema, "container.height", 0);
    },
    // 内容样式，为了滚动条
    contentStyle() {
      return {
        width: warpUnit(
          this.scaleValue * this.containerWidth + CONTENT_OFFSET * 2
        ),
        height: warpUnit(
          this.scaleValue * this.containerHeight + CONTENT_OFFSET * 2
        ),
      };
    },
    workspaceInfo() {
      const { width, height } = this.containerInfo;
      const originWidth = this.schema.container.width;
      const originHeight = this.schema.container.height;
      const maxWidth = width - CONTENT_OFFSET * 2;
      const maxHeight = height - CONTENT_OFFSET * 2;
      return {
        width,
        height,
        originWidth,
        originHeight,
        maxWidth,
        maxHeight,
      };
    },
    rotateGuideItemStyle() {
      return {
        width: warpUnit(
          Math.sqrt(
            Math.pow(this.selectItemLayoutInfo.h, 2) +
              Math.pow(this.selectItemLayoutInfo.w, 2)
          ) * 1.2
        ),
      };
    },
    engineContainerStyle() {
      if (!this.opened) {
        return null;
      }
      // scale
      const scaleValue = this.scaleValue;
      const scaleStyle = { transform: `scale(${scaleValue})` };

      // position
      let positionStyle;
      const {
        originWidth,
        originHeight,
        maxWidth,
        maxHeight,
        height,
        width,
      } = this.workspaceInfo;
      const scaledWidth = scaleValue * originWidth;
      const scaledHeight = scaleValue * originHeight;

      // 展现内容小于容器
      if (scaledWidth <= maxWidth && scaledHeight <= maxHeight) {
        positionStyle = {
          left: warpUnit(
            getCenterPositionValue(width, originWidth, scaleValue)
          ),
          top: warpUnit(
            getCenterPositionValue(height, originHeight, scaleValue)
          ),
        };
        // 超出容器
      } else if (scaledWidth > maxWidth && scaledHeight > maxHeight) {
        positionStyle = {
          left: warpUnit(CONTENT_OFFSET),
          top: warpUnit(CONTENT_OFFSET),
        };
      } else if (scaledWidth > maxWidth && scaledHeight <= maxHeight) {
        positionStyle = {
          left: warpUnit(CONTENT_OFFSET),
          top: warpUnit(
            getCenterPositionValue(height, originHeight, scaleValue)
          ),
        };
      } else {
        positionStyle = {
          left: warpUnit(
            getCenterPositionValue(width, originWidth, scaleValue)
          ),
          top: warpUnit(CONTENT_OFFSET),
        };
      }

      return { ...scaleStyle, ...positionStyle };
    },
  },
  methods: {
    toggleActivate(activeSelectItem) {
      if (!activeSelectItem) {
        this.selectCurrentPage();
      }
    },
    handleCtrlClick(componentInstance, componentId) {
      console.info(componentInstance, componentId)
    },
    onDblClick() {
      let type = this.currentComponent.type;
      console.log(111);
      if (type === "ImageCmp") {
        this.$event.emit("openUploadWin", {
          onSelect: (a) => {
            if (!a || a.length === 0) {
              return;
            }
            let arr = [];
            a.forEach((ele) => {
              arr.push(ele.sourcePaht);
            });
            this.updateSchema({
              type: UPDATE_COMPONENT_PROPS,
              value: {
                "props.bgUrl": arr,
              },
            });
          },
          aSelectType: ["image"],
          multi: true,
          title: "图片",
        });
      }
    },
    getInitialScale() {
      if (!this.opened) {
        return null;
      }
      // 计算缩放以及居中属性
      const {
        originWidth,
        originHeight,
        maxWidth,
        maxHeight,
      } = this.workspaceInfo;
      const widthScale = getScaleValue(originWidth, maxWidth);
      const heightScale = getScaleValue(originHeight, maxHeight);
      return Math.min(widthScale, heightScale);
    },
    handleClickComponent(ref, componentId) {
      this.selectComponent(componentId);
    },
    handleRightClickComponent(ref, componentId, event) {
      this.selectComponent(componentId);
      event.stopPropagation();
      event.preventDefault();
      Vue.nextTick(() => this.onContextmenu(true, event));
    },
    updateSelectItemInfo() {
      if (this.currentComponentId) {
        Vue.nextTick(() => {
          const dom = this.$refs.render.getCmp(this.currentComponentId).$el;
          const container = this.$refs.renderContainer;
          this.selectItemInfo = {
            position: {
              height: dom.offsetHeight * this.scaleValue,
              width: dom.offsetWidth * this.scaleValue,
              top: dom.offsetTop * this.scaleValue + container.offsetTop,
              left: dom.offsetLeft * this.scaleValue + container.offsetLeft,
            },
          };
          this.toggleActivate(true);
        });
      }
    },
    commitDragMutation(left, top, type) {
      left = this.positionHandler(left, "hoz");
      top = this.positionHandler(top, "ver");
      this.updateSchema({
        type,
        value: {
          left,
          top,
        },
      });
    },
    onDragStart() {
      this.updateSchema({
        type: BEFORE_UPDATE_COMPONENT_POSITION,
      });
      this.highlightState = true;
    },
    onDrag(left, top) {
      this.dragging = true;
      this.highlightState = true;
      this.commitDragMutation(left, top, UPDATING_COMPONENT_POSITION);
    },
    dragStop(left, top) {
      if (this.dragging) {
        this.dragging = false;
        this.commitDragMutation(left, top, AFTER_UPDATE_COMPONENT_POSITION);
      }
      this.highlightState = false;
    },
    positionHandler(value, direction = "ver") {
      const container = this.$refs.renderContainer;
      // 与container的某个方向（水平/垂直）的距离
      let offsetValue;
      // 元素左下与元素右下的某个方向（水平/垂直）距离
      let directionOffset;
      if (direction === "hoz") {
        offsetValue = container.offsetLeft;
        directionOffset = this.currentComponent.layoutConfig.width;
      } else {
        offsetValue = container.offsetTop;
        directionOffset = this.currentComponent.layoutConfig.height;
      }
      value = Math.round((value - offsetValue) / this.scaleValue);
      // 检测辅助线
      return this.calculateAdsorbentValue(value, directionOffset, direction);
    },
    calculateAdsorbentValue(value, directionOffset, direction) {
      // 元素右下的值
      const anotherValue = value + directionOffset;
      // 元素在画布外，不需要做吸附效果
      if (anotherValue < 0) {
        return value;
      }
      let testSet;
      let moveVector;
      if (direction === "hoz") {
        testSet = this.gridGuideVerSet;
        moveVector = this.hozVector * -1;
      } else {
        testSet = this.gridGuideHozSet;
        moveVector = this.verVector * -1;
      }

      let offset;
      const valueOffsetObj = this.getOffsetValue(value, testSet, moveVector);
      const anotherValueOffsetObj = this.getOffsetValue(
        anotherValue,
        testSet,
        moveVector
      );
      let offsetConfig;
      //        direction === 'hoz' && console.info(valueOffsetObj, anotherValueOffsetObj, moveVector);
      if (valueOffsetObj.isHitTarget && anotherValueOffsetObj.isHitTarget) {
        offsetConfig =
          Math.abs(valueOffsetObj.offset) <
          Math.abs(anotherValueOffsetObj.offset)
            ? valueOffsetObj
            : anotherValueOffsetObj;
      } else if (valueOffsetObj.isHitTarget) {
        offsetConfig = valueOffsetObj;
      } else {
        offsetConfig = anotherValueOffsetObj;
      }
      this.highlightGuide(offsetConfig.target, direction);
      offset = offsetConfig.offset;
      return value + offset;
    },
    getOffsetValue(value, set = [], vector) {
      // todo 可以换成2分查找，不过数据量不大，好像也可以不用优化
      let offset = window.Infinity;
      let target = null;
      set.forEach((test) => {
        const currentOffset = test - value;
        if (Math.abs(currentOffset) > GRID_ADSORBENT_VALUE) {
          return;
        }
        if (
          currentOffset * vector >= 0 &&
          Math.abs(currentOffset) < Math.abs(offset)
        ) {
          offset = currentOffset;
          target = test;
        }
      });
      return {
        isHitTarget: offset !== window.Infinity,
        offset: offset === window.Infinity ? 0 : offset,
        target,
      };
    },
    highlightGuide(guide, direction) {
      this.highlightGuideConfig[direction] = {
        guide,
        hidden: !this.highlightState && guide !== null,
      };
    },
    commitResizeMutation(left, top, width, height, type) {
      left = this.positionHandler(left, "hoz");
      top = this.positionHandler(top, "ver");
      this.updateSchema({
        type,
        value: {
          left,
          top,
          width: width / this.scaleValue,
          height: height / this.scaleValue,
        },
      });
    },
    onResizeStart() {
      this.updateSchema({
        type: BEFORE_UPDATE_COMPONENT_SIZE,
      });
      this.highlightState = true;
    },
    onResize(left, top, width, height) {
      this.resizing = true;
      this.highlightState = true;
      this.commitResizeMutation(
        left,
        top,
        width,
        height,
        UPDATING_COMPONENT_SIZE
      );
    },
    resizeStop(left, top, width, height) {
      if (this.resizing) {
        this.resizing = false;
        this.commitResizeMutation(
          left,
          top,
          width,
          height,
          AFTER_UPDATE_COMPONENT_SIZE
        );
      }
      this.highlightState = false;
    },
    mousemove(e) {
      if (this.resizing || this.dragging) {
        const { x, y } = e;
        this.verVector = this.lastTop - y;
        this.hozVector = this.lastLeft - x;
        this.lastTop = y;
        this.lastLeft = x;
      }
    },
    rotateActiveChange(active) {
      this.rotateActive = active;
    },
    onContextmenu(isComponent, event) {
      this.$contextmenu({
        items: [
          {
            label: "复制",
            disabled: !isComponent,
            icon: "el-icon-copy-document",
            onClick: () => {
              this.$$copyComponent();
            },
          },
          {
            label: "粘贴",
            disabled: !this.copyComponent,
            icon: "el-icon-document-copy",
            onClick: () => {
              this.$$pasteComponent();
            },
          },
          {
            label: "删除",
            disabled: !isComponent,
            icon: "el-icon-delete",
            onClick: () => {
              this.updateSchema({
                type: DELETE_COMPONENT,
              });
            },
          },
          {
            label: "置顶",
            disabled: !isComponent,
            icon: "el-icon-top",
            onClick: () => {
              this.updateSchema({
                type: UPDATE_INDEX_TO_TOP,
              });
            },
          },
          {
            label: "置底",
            disabled: !isComponent,
            icon: "el-icon-bottom",
            onClick: () => {
              this.updateSchema({
                type: UPDATE_INDEX_TO_BOTTOM,
              });
            },
          },
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "custom-class",
        zIndex: 3,
        minWidth: 230,
      });
      return false;
    },
    ...mapMutations(["selectComponent", "updateSchema", 'selectCurrentPage']),
  },
};
</script>

<template>
  <div class="work-space" ref="workspace">
    <!--滚动条-->
    <div :style="contentStyle" v-if="opened"></div>

    <div
      class="engine-design-mode"
      ref="renderContainer"
      :style="engineContainerStyle"
      @contextmenu="onContextmenu(false, $event)"
    >
      <render
        @ctrlClick="handleCtrlClick"
        v-if="opened"
        ref="render"
        :renderData="schema"
        :currentPage="currentPageId"
        @click="handleClickComponent"
        @rightClick="handleRightClickComponent"
        :designMode="true"
        baseUrl=""
      ></render>
      <div class="grid-guide">
        <!--辅助线-->
        <div
          :class="['grid-guide-item']"
          v-for="n in gridGuideHozSet"
          :key="n"
          :style="{
            top: `${n}px`,
            width: `${Math.max(containerWidth, containerHeight)}px`,
          }"
        ></div>
        <div
          :class="['grid-guide-item ver']"
          v-for="n in gridGuideVerSet"
          :key="'ver' + n"
          :style="{
            left: `${n}px`,
            width: `${Math.max(containerWidth, containerHeight)}px`,
          }"
        ></div>
        <div
          v-if="this.highlightState && highlightGuideConfig.ver.guide !== null"
          class="highlight grid-guide-item"
          :style="{
            top: `${highlightGuideConfig.ver.guide}px`,
            width: `${Math.max(containerWidth, containerHeight)}px`,
          }"
        ></div>
        <div
          v-if="this.highlightState && highlightGuideConfig.hoz.guide !== null"
          class="highlight grid-guide-item ver"
          :style="{
            left: `${highlightGuideConfig.hoz.guide}px`,
            width: `${Math.max(containerWidth, containerHeight)}px`,
          }"
        ></div>
      </div>
    </div>

    <div
      :key="scaleValue"
      v-if="currentComponentId"
      class="select-item-container"
      ref="selectItemContainer"
    >
      <!--选中框-->
      <vue-draggable-resizable
        :style="{
          transform: `translate(${selectItemLayoutInfo.x}px, ${selectItemLayoutInfo.y}px) rotate(${selectItemLayoutInfo.rotation}deg)`,
        }"
        ref="selectItem"
        :class="['ae-select-item']"
        :draggable="!isCurrentComponentLocked"
        :active="true"
        :preventDeactivation="false"
        :parent="true"
        :min-width="null"
        :min-height="null"
        :x="selectItemLayoutInfo.x"
        :y="selectItemLayoutInfo.y"
        :h="selectItemLayoutInfo.h"
        :w="selectItemLayoutInfo.w"
        drag-cancel=".rotate"
        @dragging="onDrag"
        :onDragStart="onDragStart"
        :onResizeStart="onResizeStart"
        @resizing="onResize"
        @dragstop="dragStop"
        @resizestop="resizeStop"
        @dblclick.native="onDblClick"
        @deactivated="toggleActivate(false)"
      >
        <div
          :style="{ width: '100%', height: '100%' }"
          @contextmenu="onContextmenu(true, $event)"
        ></div>
        <rotate-operate
          :active="rotateActive"
          @activeChange="rotateActiveChange"
        ></rotate-operate>
        <div
          class="rotate-guide"
          v-if="rotateActive"
          :style="{
            transform: `translate(-50%, -50%) rotate(-${selectItemLayoutInfo.rotation}deg)`,
          }"
        >
          <div
            v-for="n in 4"
            class="rotate-guide-item"
            :key="n"
            :style="[
              { transform: `rotate(${n * 45}deg)` },
              rotateGuideItemStyle,
            ]"
          ></div>
        </div>
      </vue-draggable-resizable>
    </div>

    <editorWin :parentWidth="workspaceWidth"></editorWin>
  </div>
</template>

<style lang="less" scoped>
/*.editWin {*/
/*position: absolute;*/
/*left: 0;*/
/*top: 0;*/
/*bottom: 0;*/
/*right: 0;*/

/*&.vdr {*/
/*border: none;*/
/*}*/
/*}*/

.work-space {
  /*position: relative;*/
  /*user-select: none;*/
  /*height: 100%;*/
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  /*width: 100%;*/
  /*height: 100%;*/
  // top: 40px;
  // left: 200px;
  // right: 219px;
  // bottom: 0;

  background: #282828;
  // overflow: auto;
  z-index: 2;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .engine-design-mode {
    transform-origin: left top;
    position: absolute;
  }
  .select-item-container {
    transform-origin: left top;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    .ae-select-item {
      pointer-events: auto;
      &.hidden-vdr {
        border: none;
      }
    }
  }

  .rotate-guide {
    position: absolute;
    left: 50%;
    top: 50%;
    .rotate-guide-item {
      border: 1px dashed #333;
    }
  }

  .grid-guide {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;

    .grid-guide-item {
      position: absolute;
      border: 1px dashed rgb(217, 217, 217);
      height: 1px;
      &.ver {
        transform: rotate(90deg);
        transform-origin: top left;
      }
      &.highlight {
        border-color: #333;
      }
    }
  }
}
</style>
