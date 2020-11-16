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
      ...mapState(['schema', 'currentComponentId', 'currentComponentInfo', 'currentPage', 'opened']),
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
    },
    methods: {
      handleClick(ref, componentId) {
        const dom = ref.$el;
        console.info(dom);
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
    <render v-if="opened"
        :renderData="schema"
        :currentPage="currentPage"
        @click="handleClick"
        :designMode="true"
        class="engine-design-mode"
    ></render>
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
  }
  .engine-design-mode {
    transform-origin: left top;
    transform: scale(0.700521);
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