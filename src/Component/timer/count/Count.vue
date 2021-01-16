<template>
  <BaseCount :cmpConfig="cmpConfig" :isCountdown="false"></BaseCount>
</template>

<script>
  import BaseCount from '../BaseCount.vue';

  export default {
    name: "countCmp",
    components: {
      BaseCount,
    },
    props: ["cmpConfig"],
  }
</script>

<style lang="less">

</style>