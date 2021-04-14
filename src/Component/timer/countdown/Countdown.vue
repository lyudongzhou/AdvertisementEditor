<template>
  <baseCmp :cmpConfig="cmpConfig">
    <BaseCount :cmpConfig="cmpConfig" :isCountdown="true"></BaseCount>
  </baseCmp>
</template>

<script>
  import BaseCount from '../BaseCount.vue';
  import baseCmp from '../../Base.vue';

  export default {
    name: "countdownCmp",
    components: {
      BaseCount,
      baseCmp,
    },
    props: ["cmpConfig"],
  }
</script>

<style lang="less">

</style>