<script>
  import {CHANGE_SCALE} from '../constant/event';
  import {SCALE_STEP} from '../constant/base';

  export default {
    components: {
    },
    created() {
    },
    data() {
      return {
        operators: [
          {icon: 'el-icon-top-left', key: 'undo', label: '撤销'},
          {icon: 'el-icon-top-right', key: 'do', label: '恢复'},
          {icon: 'el-icon-zoom-in', key: 'zoomIn', label: '放大'},
          {icon: 'el-icon-zoom-out', key: 'zoomOut', label: '缩小'},
          {icon: 'el-icon-view', key: 'preview', label: '预览'},
          {icon: 'el-icon-delete', key: 'clear', label: '清空'},
        ]
      };
    },
    methods: {
      handleClick(key) {
        switch (key) {
          case 'zoomIn':
            this.$event.emit(CHANGE_SCALE, SCALE_STEP);
            break;
          case 'zoomOut':
            this.$event.emit(CHANGE_SCALE, -SCALE_STEP);
            break;
        }
      }
    }
  }
</script>

<template>
  <div class="flex-column them-dark-bg full-height them-dark-text">
    <i v-for="config in operators" :class="config.icon" :title="config.label" :key="config.key" @click="handleClick(config.key)"></i>
  </div>
</template>