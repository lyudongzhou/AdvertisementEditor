<script>
  import render from '../../Render/render.vue';
  import {mapState, mapGetters, mapMutations} from '../store';
  import {getPropByPath} from '../../Utils/utils';
  import VueDraggableResizable from 'vue-draggable-resizable';
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
  import editorWin from './EditorWindow';
  import Vue from 'vue';
  import {CHANGE_SCALE, UPDATE_SELECT_INFO} from '../constant/event';
  import {CONTENT_OFFSET} from '../constant/base';
  import {
    BEFORE_UPDATE_COMPONENT_SIZE,
    UPDATING_COMPONENT_SIZE,
    AFTER_UPDATE_COMPONENT_SIZE,

    BEFORE_UPDATE_COMPONENT_POSITION,
    UPDATING_COMPONENT_POSITION,
    AFTER_UPDATE_COMPONENT_POSITION,
  } from '../constant/schema';

  const getScaleValue = (originValue, maxValue) => {
    if (maxValue >= originValue) {
      return 1;
    }
    return maxValue / originValue;
  };

  const getCenterPositionValue = (containerValue, originValue, scaleValue) =>
    (containerValue - originValue * scaleValue) / 2;

  const warpUnit = (value, unit = 'px') => `${value}${unit}`;

  const calculateRealValue = (value, scale) => Math.floor(value / scale);

  export default {
    components: {
      render,
      VueDraggableResizable,
      editorWin,
    },
    created() {
      window.display = this;
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
    },
    destroyed() {
    },
    data() {
      return {
        scaleState: null,
        selectItemInfo: null,
        draging: false,
        resizing: false,
      };
    },
    computed: {
      ...mapState([
        'vmSchema',
        'currentComponentId',
        'opened',
        'currentPageId'
      ]),
      ...mapGetters(['currentComponent']),
      containerOffset() {
        const {
          top,
          left,
        } = this.$refs.renderContainer.getBoundingClientRect();
        const {
          top: selectItemContainerTop,
          left: selectItemContainerLeft,
        } = this.$refs.selectItemContainer.getBoundingClientRect();
        return {
          top: top - selectItemContainerTop,
          left: left - selectItemContainerLeft,
        };
      },
      selectItemLayoutInfo() {
        const {top, left, width, height} = getPropByPath(
          this.selectItemInfo,
          'position',
          {},
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

          rotation: this.currentComponent.layoutConfig.rotation,
        };
      },
      scaleValue() {
        if (this.scaleState) {
          return this.scaleState;
        } else {
          return this.getInitialScale();
        }
      },
      // 内容样式，为了滚动条
      contentStyle() {
        return {
          width: warpUnit(
            this.scaleValue * this.vmSchema.container.width +
            CONTENT_OFFSET * 2,
          ),
          height: warpUnit(
            this.scaleValue * this.vmSchema.container.height +
            CONTENT_OFFSET * 2,
          ),
        };
      },
      workspaceInfo() {
        const {
          width,
          height,
        } = this.$refs.workspace.getBoundingClientRect();
        const originWidth = this.vmSchema.container.width;
        const originHeight = this.vmSchema.container.height;
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
      engineContainerStyle() {
        if (!this.opened) {
          return null;
        }
        // scale
        const scaleValue = this.scaleValue;
        const scaleStyle = {transform: `scale(${scaleValue})`};

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
              getCenterPositionValue(width, originWidth, scaleValue),
            ),
            top: warpUnit(
              getCenterPositionValue(height, originHeight, scaleValue),
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
              getCenterPositionValue(height, originHeight, scaleValue),
            ),
          };
        } else {
          positionStyle = {
            left: warpUnit(
              getCenterPositionValue(width, originWidth, scaleValue),
            ),
            top: warpUnit(CONTENT_OFFSET),
          };
        }

        return {...scaleStyle, ...positionStyle};
      },
    },
    methods: {
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
      updateSelectItemInfo() {
        if (this.currentComponentId) {
          Vue.nextTick(() => {
            const dom = this.$refs.render.getCmp(
              this.currentComponentId,
            ).$el;
            const {
              top,
              left,
              height,
              width,
            } = dom.getBoundingClientRect();
            const {
              top: containerTop,
              left: containerLeft,
            } = this.$refs.workspace.getBoundingClientRect();
            this.selectItemInfo = {
              position: {
                height: height,
                width: width,
                top: top - containerTop,
                left: left - containerLeft,
              },
            };
          });
        }
      },
      commitDragMutation(left, top, type) {
        const {top: offsetTop, left: offsetLeft} = this.containerOffset;
        this.updateSchema({
          type,
          value: {
            left: calculateRealValue(left - offsetLeft, this.scaleValue),
            top: calculateRealValue(top - offsetTop, this.scaleValue),
          },
        });
        //        this.selectItemInfo.position.left = left;
        //        this.selectItemInfo.position.top = top;
      },
      onDragStart() {
        this.updateSchema({
          type: BEFORE_UPDATE_COMPONENT_POSITION,
        });
      },
      onDrag(left, top) {
        this.draging = true;
        this.commitDragMutation(left, top, UPDATING_COMPONENT_POSITION);
      },
      dragStop(left, top) {
        if (this.draging) {
          this.draging = false;
          this.commitDragMutation(left, top, AFTER_UPDATE_COMPONENT_POSITION);
        }
      },
      commitResizeMutation(left, top, width, height, type) {
        const {top: offsetTop, left: offsetLeft} = this.containerOffset;
        this.updateSchema({
          type,
          value: {
            left: calculateRealValue(left - offsetLeft, this.scaleValue),
            top: calculateRealValue(top - offsetTop, this.scaleValue),
            width: calculateRealValue(width, this.scaleValue),
            height: calculateRealValue(height, this.scaleValue),
          },
        });
      },
      onResizeStart() {
        this.updateSchema({
          type: BEFORE_UPDATE_COMPONENT_SIZE,
        });
      },
      onResize(left, top, width, height) {
        this.resizing = true;
        this.commitResizeMutation(left, top, width, height, UPDATING_COMPONENT_SIZE);
      },
      resizeStop(left, top, width, height) {
        if (this.resizing) {
          this.resizing = false;
          this.commitResizeMutation(left, top, width, height, AFTER_UPDATE_COMPONENT_SIZE);
        }
      },

      ...mapMutations(['selectComponent', 'updateSchema']),
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
    >
      <render
          v-if="opened"
          ref="render"
          :renderData="vmSchema"
          :currentPage="currentPageId"
          @click="handleClickComponent"
          :designMode="true"
          baseUrl=""
      ></render>
    </div>

    <div
        v-if="currentComponentId"
        class="select-item-container"
        ref="selectItemContainer"
    >
      <!--选中框-->
      <vue-draggable-resizable
          :style="{
                    transform: `translate(${selectItemLayoutInfo.x}px, ${selectItemLayoutInfo.y}px) rotate(${selectItemLayoutInfo.rotation}deg)`,
                }"
          class="select-item"
          :active="true"
          :preventDeactivation="true"
          :parent="true"
          :min-width="null"
          :min-height="null"
          :x="selectItemLayoutInfo.x"
          :y="selectItemLayoutInfo.y"
          :h="selectItemLayoutInfo.h"
          :w="selectItemLayoutInfo.w"
          @dragging="onDrag"
          :onDragStart="onDragStart"
          :onResizeStart="onResizeStart"
          @resizing="onResize"
          @dragstop="dragStop"
          @resizestop="resizeStop"
      >
        <div class="test"></div>
      </vue-draggable-resizable>
    </div>

    <div>
      <!--辅助线-->
    </div>
    <editorWin
        class="editWin"
    ></editorWin>
  </div>
</template>

<style lang="less" scoped>
  .editWin {
    position: absolute;
    left: 0px;
    top: 50px;
    bottom: 0;
    right: 0;
  }

  .work-space {
    /*position: relative;*/
    /*user-select: none;*/
    /*height: 100%;*/
    position: absolute;
    width: 100%;
    height: 100%;
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
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      .select-item {
        pointer-events: auto;
      }
    }

    .test {
      position: absolute;
      top: -30px;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: aqua;
      left: 50%;
      transform: translateX(-50%);
      &:after {
        content: '';
        display: block;
        border-left: 1px solid aqua;
        position: absolute;
        left: 50%;
        bottom: -20px;
        top: 0;
      }
    }
  }
</style>
