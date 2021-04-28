<template>
  <baseTextCmp :cmpConfig="textProps"></baseTextCmp>
</template>

<script>
  import baseTextCmp from './BaseText';
  export default {
    name: "BaseTimer",
    components: {
      baseTextCmp,
    },
    props: ["cmpConfig", 'text'],
    computed: {
      textProps() {
        let {startTime, endTime, countTime, format, ...rest} = this.cmpConfig.props;// eslint-disable-line no-unused-vars
        return {...this.cmpConfig, props: {...rest, text: this.text}};
      }
    }
  }
</script>

<style lang="less">

</style>