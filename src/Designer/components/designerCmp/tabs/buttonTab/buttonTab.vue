<template>
  <div class="basic_tab button_tab" style="align-items:flex-start">
    <p>按钮样式</p>
    <div class="buttons">
      <div v-for="(btn,index) in buttonStyle" :key="index"
           :class="{'active_btn': activeBtn===btn.className}"
          @click="choiceBtn(btn)">
        <button :class="btn.className">
          {{index===buttonStyle.length-1?'透明按钮':'Button'}}
        </button>
      </div>
    </div>
    <text-style v-if="activeBtn!=='btn6'" :configData="configData" :config="config"></text-style>
    <p v-if="activeBtn!=='btn6'">背景颜色</p>
    <colorpicker-filed v-if="activeBtn!=='btn6'" :configData="configData" :config="hueConfig"></colorpicker-filed>
  </div>
</template>

<script>
  import textStyle from '../../editors/textStyle/textStyle';
  import colorpickerFiled from '../../editors/colorpickerFiled/colorpickerFiled';
  import { mapMutations } from "../../../../store";
  import {
    BEFORE_UPDATE_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
  } from "../../../../constant/schema";

  export default {
    name: "buttonTab",
    components: {
      textStyle,
      colorpickerFiled,
    },
    props: ["configData", "config"],
    data () {
      return {
        buttonStyle: [
          { className: 'btn1', target: 'btnProps.background'},
          { className: 'btn2', target: 'btnProps.background'},
          { className: 'btn3', target: 'btnProps.border-color'},
          { className: 'btn4', target: 'btnProps.background'},
          { className: 'btn5', target: 'btnProps.background'},
          { className: 'btn6', target: 'btnProps.border-color'},
        ],
        test: false,
        path: 'btnProps.background',
        activeBtn: 'btn1',
        hueConfig: {
          "target": 'btnProps.background',
          "props": {
            "changeType": "cmp",
            "type": {
              "before": "BEFORE_UPDATE_COMPONENT_PROPS",
              "update": "UPDATING_COMPONENT_PROPS",
              "after": "AFTER_UPDATE_COMPONENT_PROPS"
            }
          },
        }
      }
    },
    computed: {
      btn1 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': '#ABCCF6',
          'color': '#4D4D4D',
          'border-radius': '12px',
          'box-shadow': `inset 0px -${height*0.2}px 0px #4A92ED`,
          'border-width': '0px',
          'border-style': 'none',
          'border-color': 'transparent',
        }
      },
      btn2 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': 'linear-gradient(to right, #ABCCF6, #4A92ED)',
          'color': '#4D4D4D',
          'border-radius': '36px',
          'box-shadow': 'none',
          'border-width': '0px',
          'border-style': 'none',
          'border-color': 'transparent',
        }
      },
      btn3 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'color': '#4A92ED',
          'background': 'transparent',
          'border-radius': '12px',
          'box-shadow': 'none',
          'border-width': '4px',
          'border-style': 'solid',
          'border-color': '#4A92ED',
        }
      },
      btn4 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': '#4A92ED',
          'color': '#4D4D4D',
          'border-radius': '4px',
          'box-shadow': `inset 0px ${height*0.5}px 0px #ABCCF6`,
          'border-width': '0px',
          'border-style': 'none',
          'border-color': 'transparent',
        }
      },
      btn5 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': '#ABCCF6',
          'color': '#4D4D4D',
          'border-radius': '86px 0px 100px 0px',
          'box-shadow': `inset 0px -14px 0px #4A92ED`,
          'border-width': '0px',
          'border-style': 'none',
          'border-color': 'transparent',
        }
      },
      btn6 () {
        return {
          'background': 'transparent',
          'color': 'transparent',
          'box-shadow': 'none',
          'border-width': '0px',
          'border-style': 'none',
          'border-color': 'transparent',
        }
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      changeStyle (type) {
        this.updateSchema({
          type: type,
          value: {
            [this.configData.btnProps]: this.configData.btnProps,
          },
        });
      },
      choiceBtn (style) {
        this.path = style.target;
        this.$set(this.hueConfig, 'target', this.path);
        this.activeBtn = style.className;
        this.changeStyle(BEFORE_UPDATE_COMPONENT_PROPS);
        Object.assign(this.configData.btnProps, this[style.className]);
        console.log(this.configData.btnProps, 111111);
        this.changeStyle(AFTER_UPDATE_COMPONENT_PROPS);
      }
    },
  };
</script>

<style lang="less" scope>
  .button_tab {
    color: #FFF;
    flex-direction: column;
    align-items: flex-start;
    .buttons {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      >div {
        width: 108px;
        height: 40px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 0 3px 10px 1px;
        text-align: center;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 90%;
          height: 30px;
          line-height: 30px;
          background: none;
          outline: none;
          border: none;
          cursor: pointer;
          text-align: center;
          box-sizing: border-box;
        }
        .btn1 {
          background: #ABCCF6;
          color: #fff;
          border-radius: 4px;
          line-height: 26px;
          box-shadow: inset 0px -4px 0px #4A92ED;
        }
        .btn2 {
          background: linear-gradient(to right, #ABCCF6, #4A92ED);
          color: #fff;
          border-radius: 4px;
        }
        .btn3 {
          color: #4A92ED;
          border: 1px solid #4A92ED;
          border-radius: 4px;
        }
        .btn4 {
          background: #ABCCF6;
          color: #fff;
          border-radius: 4px;
          box-shadow: inset 0px -15px 0px #4A92ED;
        }
        .btn5 {
          background: #ABCCF6;
          border-radius: 110px 0px;
          color: #fff;
          box-shadow: inset 0px -4px 0px #4A92ED;
        }
        .btn6 {
          background: transparent;
          border: 1px solid #fff;
          border-radius: 4px;
          color: #FFF;
          box-sizing: border-box;
        }
      }
      .active_btn {
        background: #ccc;
      }
    }
  }
</style>
