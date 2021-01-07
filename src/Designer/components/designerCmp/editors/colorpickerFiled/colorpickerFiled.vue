<template lang="html">
  <div class="colorpickerFiled" style="width: 199px;height:350px;">
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
  props: ['configData', 'config'],
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
      'currentPage'
    ]),
    changeSchema () {
      return getPropByPath(this.configData, this.config.target);
    }
  },
  mounted () {
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
        this.updateSchema({
          type: this.config.props.type.after || null,
          value: this.config.props.changeType === 'page'?
                  {
                    ["type"]: "color",
                    ["value"]:hex,
                  }:{[this.config.target]:hex},
        });
      },
      change: () => {},
    })
  },
  methods: {
    ...mapMutations([
      'updateSchema',
    ])
  },
  watch: {
    changeSchema (n) {
      if (n.type === 'color') {
        this._colorPicker.setColorByInput(n.value);
      }
    }
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
