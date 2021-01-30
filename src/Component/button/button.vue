<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <button :style="btnStyle">
      <span class="textSpan" :style="publicList">{{cmpConfig.props.text}}</span>
    </button>
  </baseCmp>
</template>

<script>
  import baseCmp from "../Base.vue";
  import { mapGetters } from "../../Render/store/";

  export default {
    name: "buttonCmp",
    props: ["cmpConfig"],
    components: {
      baseCmp,
    },
    data() {
      return {
        url: "",
        type: 0,
      };
    },
    watch: {
      "cmpConfig.props.url"(value) {
        this.url = value;
      },
    },
    computed: {
      ...mapGetters(["handleUrl"]),
      btnStyle() {
        const style = {};
        Object.keys(this.cmpConfig.btnProps).forEach((key) => {
          switch (key) {
            case 'width':
                style[key] = this.cmpConfig.layoutConfig[key]+'px'
                break
            case 'height':
                style[key] = this.cmpConfig.layoutConfig[key]+'px'
                break
            case 'background-color':
                style[key] = this.cmpConfig.btnProps[key]
                break
            case 'box-shadow':
                style[key] = `#43a1ff 0px ${this.cmpConfig.layoutConfig.height*0.8} 0px 0px`
                break
            case 'border-radius':
                style[key] = this.cmpConfig.btnProps['border-radius'].split('px').length>2?
                                         `${this.cmpConfig.layoutConfig.height}px 0px`:
                                         (this.cmpConfig.btnProps['border-radius']!=='4px'?
                                            `${this.cmpConfig.layoutConfig.height*0.8}px`:
                                            this.cmpConfig.btnProps[key])
                break
            case 'border-width':
                style[key] = this.cmpConfig.layoutConfig.height*0.1+'px'
                break
            case 'border-style':
                style[key] = this.cmpConfig.btnProps[key]
                break
            case 'border-color':
                style[key] = this.cmpConfig.btnProps[key]
          }
        })
        return style;
      },
      publicList() {
          const style = {};
          Object.keys(this.cmpConfig.props).forEach((key) => {
            switch (key) {
              case 'fontFamily':
                  style['font-family'] = this.cmpConfig.props[key]
                  break
              case 'fontSize':
                  style['font-size'] = this.cmpConfig.props[key] + 'px'
                  break
              case 'color':
                  style['color'] = this.cmpConfig.props[key]
            }
          })
          return style;
      },
    },
    mounted() {
      this.url = this.cmpConfig.props.url;
    },
    methods: {
      // checkUrl(value){
      //   return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(value);
      // }
    },
  };
</script>

<style lang="less" scoped>
.textSpan {
  text-overflow: clip;
  width: auto;
  height: auto;
  min-height: 60%;
  min-width: 60%;
  max-width: 100%;
  max-height: 100%;
  background: 0;
  border: 0 dashed #eee;
  outline: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
