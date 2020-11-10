<script>
  export default {
    components: {
    },
    created() {
    },
    data() {
      return {
        componentConfig: [
          {label: '文本'},
          {label: '图片'},
          {label: '视频'},
          {label: '组件'},
          {label: '插件'},
          {label: '其他'},
        ]
      };
    }
  }
</script>

<template>
  <div class="flex-container content-center">
    <el-button v-for="config in componentConfig" :key="config.label">{{config.label}}</el-button>
  </div>
</template>