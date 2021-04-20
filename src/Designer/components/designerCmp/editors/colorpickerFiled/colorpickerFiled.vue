<template lang="html">
  <div class="colorpickerFiled" style="width: 199px;height:340px;">
    <div class="color_warp" ref="color_warp" style="width: 199px;">
      <div class="color_palette" ref="color_palette">
        <p v-for="(item, index) in palette" :item="item" :key="index" v-bind:style="{background: item}"></p>
      </div>
    </div>
    <div class="color_picker" ref="color_picker"></div>
  </div>
</template>

<script>
import {Colorpicker} from "../../../../private/colorpicker";
import { mapGetters, mapMutations } from '../../../../store';
import {getPropByPath} from '@/utils';

export default {
  name: 'colorpickerFiled',
  props: ['configData', 'config', 'btnName', 'btnStyle'],
  data () {
    return {
      palette: [
        "rgb(0, 0, 0)",
        "rgb(67, 67, 67)",
        "rgb(102, 102, 102)",
        "rgb(204, 204, 204)",
        "rgb(217, 217, 217)",
        "rgb(255, 255, 255)",
        "rgb(152, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 153, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 255, 255)",
        "rgb(74, 134, 232)",
        "rgb(0, 0, 255)",
        "rgb(153, 0, 255)",
        "rgb(255, 0, 255)",
        "rgb(230, 184, 175)",
        "rgb(244, 204, 204)",
        "rgb(252, 229, 205)",
        "rgb(255, 242, 204)",
        "rgb(217, 234, 211)",
        "rgb(208, 224, 227)",
        "rgb(201, 218, 248)",
        "rgb(207, 226, 243)",
        "rgb(217, 210, 233)",
        "rgb(234, 209, 220)",
        "rgb(221, 126, 107)",
        "rgb(234, 153, 153)",
        "rgb(249, 203, 156)",
        "rgb(255, 229, 153)",
        "rgb(182, 215, 168)",
        "rgb(162, 196, 201)",
        "rgb(164, 194, 244)",
        "rgb(159, 197, 232)",
        "rgb(180, 167, 214)"
      ],
    }
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'currentComponent',
    ]),
    changeSchema () {
      return getPropByPath(this.configData, this.config.target);
    }
  },
  mounted () {
    if (this.config.props.changeType === 'page') {
      if (this._colorPicker) return;
      this.createColorPicker();
    } else { // cmp
      // this.$event.on('SHOWCOLORPICKER', () => {
      //   this.$nextTick(() => {
          if (this._colorPicker) return;
          this.createColorPicker();
      //   })
      // });
    }
  },
  methods: {
    ...mapMutations([
      'updateSchema',
    ]),
    createColorPicker () {
      this._colorPicker = Colorpicker.create({
        el: this.$refs['color_picker'],
        bodyDom: this.$refs['color_warp'],
        palette: this.$refs['color_palette'],
        color: this.configData && this.configData[this.config.target]?
               this.configData[this.config.target].value||this.configData[this.config.target]:
               "rgb(0, 0, 0)",
        down: () => {
          this.updateSchema({
            type: this.config.props.type.before || null
          });
        },
        move: (hex) => {
          this.updateSchema({
            type: this.config.props.type.update || null,
            value: {["value"]:hex},
          });
        },
        up: (hex) => {
          if (this.config.props.changeType === 'btn') {
            // 针对于button

            if (this.btnName === 'btn1') {
              this.updateSchema({
                type: this.config.props.type.after || null,
                value: {
                  [this.config.target]:hex,
                  "btnProps.boxShadow":`inset 0px -14.4px 0px ${this.lightDarkenColor(hex, 60)}`,
                },
              });
            } else if (this.btnName === 'btn2') {
              this.updateSchema({
                type: this.config.props.type.after || null,
                value: {[this.config.target]:`linear-gradient(to right, ${this.colorRgba(hex, 0.4)}, ${hex})`},
              });
            } else if (this.btnName === 'btn4') {
              this.updateSchema({
                type: this.config.props.type.after || null,
                value: {
                  [this.config.target]:`linear-gradient(0deg,${hex} 50%,${this.lightDarkenColor(hex, 60)} 50%)`,
                },
              });
            }  else if (this.btnName === 'btn5') {
              this.updateSchema({
                type: this.config.props.type.after || null,
                value: {
                  [this.config.target]:hex,
                  "btnProps.boxShadow":`inset 0px -14px 0px ${this.lightDarkenColor(hex, 60)}`,
                },
              });
            } else {
              this.updateSchema({
                type: this.config.props.type.after || null,
                value: {[this.config.target]:hex},
              });
            }
          } else {
            this.updateSchema({
              type: this.config.props.type.after || null,
              value: this.config.props.changeType === 'page'?
                      {
                        ["type"]: "color",
                        ["value"]:hex,
                      }:{[this.config.target]:hex},
            });
          }
        },
        change: () => {},
      })
    },
    getRgbNum(sColor){
      if(sColor.length === 4){
        var sColorNew = "#";
        for(let i=1; i<4; i+=1){
            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for(var c=1; c<7; c+=2){
        sColorChange.push(parseInt("0x"+sColor.slice(c,c+2)));
      }
      return sColorChange;
    },
    lightDarkenColor(color, num) {
      let colorArr = this.getRgbNum(color);
      let sColorChange = [];
      for(var i=0;i<colorArr.length;i++){
          let  val = colorArr[i]+num;
          if(val<0){
            val = 0;
          }
          if(val>255){
            val=255;
          }
          sColorChange.push(val)
      }
      return "rgb(" + sColorChange.join(",") + ")";
    },
    colorRgba(str,n){
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = str.toLowerCase();
      n= n||1;
      //十六进制颜色转换为RGB格式
        if(sColor && reg.test(sColor)){
          let sColorChange=this.getRgbNum(sColor);
          return "rgba(" + sColorChange.join(",") + ","+n+")";
        }else{
          return sColor;
        }
    },
  },
  watch: {
    changeSchema (n) {
      if (n.type === 'color') {
        this._colorPicker.setColorByInput(n.value);
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .colorpickerFiled {
    position: relative;
    width: 244px;
    // margin: auto;
    // top: 539px;
    >p {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 22px;
    }
    .color_warp {
      margin: auto;
      position: absolute;
      // left: 0;
      // width: 244px;
      height: auto;
      height: auto;
      z-index: 2;
      display: flex;
      flex-direction: column;
      .color_palette {
        width:244px;
        height: auto;
        margin: 10px 0 30px 0;
        // display: flex;
        // flex-flow: row wrap;
        // align-content: space-around;
        // justify-content: space-around;
        p {
          width: 16px;
          height: 16px;
          margin-right: 2px;
          border: 1px solid #fff;
          box-sizing: border-box;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
    .color_picker {
      width: 243px;
			height: 28px;
      position: absolute;
      top: 335px;
			// cursor: pointer;
			// position: absolute;
			// left: 1647px;
			// top: 947px;
    }
  }
</style>
