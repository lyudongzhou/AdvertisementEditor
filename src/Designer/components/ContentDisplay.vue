<script>
  import render from '../../Render/render.vue';
  import {mapState, mapGetters, mapMutations} from '../store';
  import {getPropByPath} from '../../Utils/utils';

  export default {
    components: {
      render,
    },
    created() {
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['vmSchema', 'currentComponentId', 'currentComponentInfo', 'currentPage', 'opened']),
      ...mapGetters(['currentComponent']),
      selectItemStyle() {
        const {top, left, width, height} = getPropByPath(this.currentComponentInfo, 'position', {});
        return {
          top: top,
          left: left,
          width,
          height,
        };
      },
      engineContainerStyle() {
        if (this.opened) {
          const {width} = this.$refs.workSpace.getBoundingClientRect();
          const containerWidth = this.vmSchema.container.width;
          const maxWidth = width - 60;
          let scaleValue;
          const result = {};
          if (maxWidth >= containerWidth) {
            scaleValue = 1;
            result.transform = `scale(${scaleValue}) translate(-50%, -50%)`;
            result.top = '50%';
            result.left = '50%';
          } else {
            scaleValue = maxWidth / containerWidth;
            result.transform = `scale(${scaleValue})`;
          }

          return result;
        }
        return null;
      }
    },
    methods: {
      handleClick(ref, componentId) {
        const dom = ref.$el;
        const {top, left, height, width} = dom.getBoundingClientRect();
        const {top: containerTop, left: containerLeft} = this.$refs.workSpace.getBoundingClientRect();
        const componentInfo = {
          position: {
            height: height + 'px',
            width: width + 'px',
            top: top - containerTop + 'px',
            left: left - containerLeft + 'px',
          },
          id: componentId,
        };
        this.selectComponent(componentInfo);
      },
      ...mapMutations(['selectComponent'])
    },
  };
</script>

<template>
  <div class="work-space" ref="workSpace">
    <!--<engine :json="schema" designMode @click="handleClick" class="engine-design-mode"></engine>-->
    <div class="engine-design-mode"
         :style="engineContainerStyle">
      <render v-if="opened"
              :renderData="vmSchema"
              :currentPage="currentPage"
              @click="handleClick"
              :designMode="true"

      ></render>
    </div>
    <div v-show="currentComponentId" class="select-item-container" ref="selectItemContainer">
      <div class="select-item" :style="selectItemStyle">
        <!--选中框-->
      </div>
    </div>

    <div>
      <!--辅助线-->
    </div>
  </div>
</template>

<style scoped>
  .work-space {
    position: relative;
    user-select: none;
    padding: 30px;
    overflow: auto;
    height: 100%;
  }
  .engine-design-mode {
    transform-origin: left top;
    position: absolute;
  }
  .select-item-container {
    position: absolute;
    left: 0;
    top: 0;
  }
  .select-item {
    position: absolute;
    border: 1px solid #409eff;
  }
</style>