<template>
  <BaseCount :cmpConfig="cmpConfig" :isCountdown="true"></BaseCount>
</template>

<script>
  import BaseCount from '../BaseCount.vue';

  export default {
    name: "countdownCmp",
    components: {
      BaseCount,
    },
    props: ["cmpConfig"],
  }
</script>

<style lang="less">

</style>