<template>
  <BaseCountTab :configData="configData" :config="config" :isCountdown="false"></BaseCountTab>
</template>

<script>
  import BaseCountTab from './BaseCountTab.vue';
  export default {
    name: 'CountTab',
    components: {BaseCountTab},
    props: ['configData', 'config'],
  }
</script>

<style lang="less" scoped>

</style>
