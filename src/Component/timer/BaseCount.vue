<template>
  <BaseTimer :cmpConfig="cmpConfig" :text="text"></BaseTimer>
</template>

<script>
  import BaseTimer from './BaseTimer.vue';
  import {getTimeRemainStr} from '@/utils';

  export default {
    name: "BaseCountdownCmp",
    components: {
      BaseTimer,
    },
    props: ["cmpConfig", 'isCountdown'],
    data() {
      return {
        now: (new Date()).getTime(),
        timerId: null,
      }
    },
    mounted() {
      this.timerId = setInterval(() => {
        this.now = (new Date()).getTime();
        if (this.getTimeLeft() <= 0 && this.isCountdown) {
          clearInterval(this.timerId);
        }
      }, 1000);
    },
    computed: {
      text() {
        const {format} = this.cmpConfig.props;
        const timeLeft = this.getTimeLeft();
        if (timeLeft <= 0) {
          return this.cmpConfig.props.text;
        }
        return getTimeRemainStr(timeLeft, format);
      }
    },
    beforeDestroy() {
      clearInterval(this.timerId);
    },
    methods: {
      getTimeLeft() {
        if (this.isCountdown) {
          return this.cmpConfig.props.endTime - this.now
        } else {
          return this.now - this.cmpConfig.props.startTime
        }
      }
    }
  }
</script>

<style lang="less">

</style>