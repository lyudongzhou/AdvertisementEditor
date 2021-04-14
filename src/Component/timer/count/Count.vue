<template>
  <baseCmp :cmpConfig="cmpConfig">
    <BaseCount :cmpConfig="cmpConfig" :isCountdown="false"></BaseCount>
  </baseCmp>
</template>

<script>
  import BaseCount from '../BaseCount.vue';
  import baseCmp from '../../Base.vue';
  export default {
    name: "countCmp",
    components: {
      BaseCount,
      baseCmp,
    },
    props: ["cmpConfig"],
  }
</script>

<style lang="less">

</style>