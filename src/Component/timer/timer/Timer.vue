<template>
  <BaseTimer :cmpConfig="cmpConfig" :text="text"></BaseTimer>
</template>

<script>
  import BaseTimer from '../BaseTimer.vue';
  export default {
    name: "timerCmp",
    components: {
      BaseTimer,
    },
    props: ["cmpConfig"],
    data() {
      return {
        text: this.cmpConfig.props.countTime,
        timerId: null,
      }
    },
    mounted() {
      this.timerId = setInterval(() => {
        if (this.text > 0) {
          let nextText = this.text - 1;
          if (nextText === 0) {
            nextText = this.cmpConfig.props.text;
          }
          this.text = nextText;
        } else {
          clearInterval(this.timerId);
        }
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timerId);
    },
  }
</script>

<style lang="less">

</style>