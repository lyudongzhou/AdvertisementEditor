<script>
  import render from '../../Render/render.vue';
  import {mapState, mapGetters, mapMutations} from '../store';
  import {getPropByPath} from '../../Utils/utils';
  import VueDraggableResizable from 'vue-draggable-resizable'
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
  import Vue from 'vue';
  import {CHANGE_SCALE, BEFORE_DELETE_COMPONENT} from '../constant/event';

  const getScaleValue = (originValue, maxValue) => {
    if (maxValue >= originValue) {
      return 1;
    }
    return maxValue / originValue;
  };
  const getCenterPositionValue = (containerValue, originValue, scaleValue) => (containerValue - originValue * scaleValue) / 2;
  const warpUnit = (value, unit = 'px') => `${value}${unit}`;
  const OFFSET = 35;
  // 缓存dom，注意内存泄漏
  let currentDom = null;

  export default {
    components: {
      render,
      VueDraggableResizable,
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
        if (this.currentComponentId) {
          Vue.nextTick(() => this.handleSelectComponent(currentDom, this.currentComponentId));
        }
      });
      this.$event.on(BEFORE_DELETE_COMPONENT, (componentId) => {
        // 删除的情况是不是this.currentComponentId必定===componentId
        if (this.currentDom && this.currentComponentId === componentId) {
          this.currentDom = null;
        }
      });
    },
    destroyed() {
      currentDom = null;
    },
    data() {
      return {
        scaleState: null,
        currentDom: null,
        testObject: {},
      };
    },
    computed: {
      ...mapState(['vmSchema', 'currentComponentId', 'currentComponentInfo', 'currentPage', 'opened']),
      ...mapGetters(['currentComponent']),
      selectItemPosition() {
        const {top, left, width, height} = getPropByPath(this.currentComponentInfo, 'position', {});
        return {
//          y: Math.ceil(top),
//          x: Math.ceil(left),
//          w: Math.ceil(width),
//          h: Math.ceil(height),
          y: top,
          x: left,
          w: width,
          h: height,
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
          width: warpUnit(this.scaleValue * this.vmSchema.container.width + OFFSET * 2),
          height: warpUnit(this.scaleValue * this.vmSchema.container.height + OFFSET * 2),
        }
      },
      workspaceInfo() {
        const {width, height} = this.$refs.workspace.getBoundingClientRect();
        const originWidth = this.vmSchema.container.width;
        const originHeight = this.vmSchema.container.height;
        const maxWidth = width - OFFSET * 2;
        const maxHeight = height - OFFSET * 2;
        return {width, height, originWidth, originHeight, maxWidth, maxHeight};
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
        const {originWidth, originHeight, maxWidth, maxHeight, height, width} = this.workspaceInfo;
        const scaledWidth = scaleValue * originWidth;
        const scaledHeight = scaleValue * originHeight;

        // 展现内容小于容器
        if (scaledWidth <= maxWidth && scaledHeight <= maxHeight) {
          positionStyle = {
            left: warpUnit(getCenterPositionValue(width, originWidth, scaleValue)),
            top: warpUnit(getCenterPositionValue(height, originHeight, scaleValue)),
          }
          // 超出容器
        } else if (scaledWidth > maxWidth && scaledHeight > maxHeight) {
          positionStyle = {
            left: warpUnit(35),
            top: warpUnit(35),
          };
        } else if (scaledWidth > maxWidth && scaledHeight <= maxHeight) {
          positionStyle = {
            left: warpUnit(35),
            top: warpUnit(getCenterPositionValue(height, originHeight, scaleValue)),
          };
        } else {
          positionStyle = {
            left: warpUnit(getCenterPositionValue(width, originWidth, scaleValue)),
            top: warpUnit(35),
          };
        }

        return {...scaleStyle, ...positionStyle};
      }
    },
    methods: {
      getInitialScale() {
        if (!this.opened) {
          return null;
        }
        // 计算缩放以及居中属性
        const {originWidth, originHeight, maxWidth, maxHeight} = this.workspaceInfo;
        const widthScale = getScaleValue(originWidth, maxWidth);
        const heightScale = getScaleValue(originHeight, maxHeight);
        return Math.min(widthScale, heightScale);
      },
      handleSelectComponent(dom, componentId) {
        // 缓存选中组件的dom
        currentDom = dom;
        const {top, left, height, width} = dom.getBoundingClientRect();
        const {top: containerTop, left: containerLeft} = this.$refs.workspace.getBoundingClientRect();
        const componentInfo = {
          position: {
            height: height,
            width: width,
            top: top - containerTop,
            left: left - containerLeft,
          },
          id: componentId,
        };
        this.selectComponent(componentInfo);
      },
      handleClick(ref, componentId) {
        const dom = ref.$el;
        currentDom = dom;
        this.handleSelectComponent(dom, componentId);
      },
      onDrag(left, top) {
        console.info(left, top);
        this.updateSchema();
      },
      onResize(...arg) {
        console.info(arg)
      },
      dragStop() {
        // todo commit vmSchema to schema
      },
      resizeStop() {
        // todo commit vmSchema to schema
      },
      ...mapMutations(['selectComponent', 'updateSchema'])
    },
  };
</script>

<template>
  <div class="work-space" ref="workspace">
    <!--<engine :json="schema" designMode @click="handleClick" class="engine-design-mode"></engine>-->

    <!--滚动条-->
    <div :style="contentStyle" v-if="opened">
    </div>

    <div class="engine-design-mode"
         :style="engineContainerStyle">
      <render v-if="opened"
              :renderData="vmSchema"
              :currentPage="currentPage"
              @click="handleClick"
              :designMode="true"

      ></render>
    </div>
    <div v-if="currentComponentId" class="select-item-container" ref="selectItemContainer">
      <!--选中框-->
        <vue-draggable-resizable
            :active="true"
            :preventDeactivation="true"
            :parent="true"
            :min-width="null"
            :min-height="null"
            :x="selectItemPosition.x"
            :y="selectItemPosition.y"
            :h="selectItemPosition.h"
            :w="selectItemPosition.w"
            @dragging="onDrag"
            @resizing="onResize"
            @dragstop="dragStop"
            @resizestop="resizeStop"
        >
          <!--<div class="select-item" :style="selectItemStyle"></div>-->
        </vue-draggable-resizable>
    </div>

    <div>
      <!--辅助线-->
    </div>
  </div>
</template>

<style lang='less' scoped>
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
    background-color: #d0cfd8;
    overflow: auto;
    z-index: 2;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    .engine-design-mode {
      transform-origin: left top;
      position: absolute;
    }
    .select-item-container {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      .select-item {
        position: absolute;
        border: 1px solid #409eff;
      }
    }
  }
</style>
