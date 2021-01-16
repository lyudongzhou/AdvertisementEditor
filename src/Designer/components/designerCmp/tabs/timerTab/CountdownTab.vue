<template>
  <BaseCountTab :configData="configData" :config="config" :isCountdown="true"></BaseCountTab>
</template>

<script>
  import BaseCountTab from './BaseCountTab.vue';
  export default {
    name: 'CountdownTab',
    components: {BaseCountTab},
    props: ['configData', 'config'],
  }
</script>

<style lang="less" scoped>

</style>
