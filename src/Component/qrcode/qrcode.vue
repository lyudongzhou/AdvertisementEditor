<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <vue-qr :text="cmpConfig.props.text"
            :margin="0"
            :size="cmpConfig.layoutConfig.width"></vue-qr>
  </baseCmp>
</template>

<script>
import baseCmp from '../Base.vue';
import vueQr from 'vue-qr';

export default {
  name: 'qrcodeCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
    vueQr,
  },
  computed: {},
  mounted() {
    // if(window.previewUrl&&this.cmpConfig.props.text === "qrcode"){
    //   this.cmpConfig.props.text = window.previewUrl;
    // }
  },
}
</script>

<style lang="less" scoped>
</style>
