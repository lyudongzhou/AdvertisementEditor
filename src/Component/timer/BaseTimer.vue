<template>
  <textCmp :cmpConfig="textProps"></textCmp>
</template>

<script>
  import textCmp from '../text/text.vue';
  export default {
    name: "BaseTimer",
    components: {
      textCmp,
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