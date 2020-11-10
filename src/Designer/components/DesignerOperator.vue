<script>
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
          {icon: 'el-icon-view', key: 'preview', label: '预览'},
          {icon: 'el-icon-delete', key: 'clear', label: '清空'},
        ]
      };
    }
  }
</script>

<template>
  <div class="flex-column them-dark-bg full-height them-dark-text">
    <i v-for="config in operators" :class="config.icon" :title="config.label" :key="config.key"></i>
  </div>
</template>