<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="warp" :style="getStyle">
      <span>{{cmpConfig.props.text}}</span>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from '../../Base.vue';

export default {
  name: 'informCmp',
  props: ['cmpConfig'],
  components: {
    baseCmp,
  },
  data () {
    return {
    }
  },
  computed: {
    getStyle () {
      let style = {};
      Object.keys(this.cmpConfig.props).forEach(key => {
        switch (key) {
          case 'font-size':
            style[key] = this.cmpConfig.props[key]+'px'
            break;
          case 'width':
            style[key] = this.cmpConfig.layoutConfig[key]+'px'
            break;
          case 'height':
            style[key] = this.cmpConfig.layoutConfig[key]+'px'
            break;
          default:
            style[key] = this.cmpConfig.props[key]
        }
      })
      return style;
    },
  },
  mounted() {},
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
</style>
