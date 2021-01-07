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
          { className: 'btn6', target: ''},
        ],
        test: false,
        path: 'btnProps.background',
        activeBtn: 'btn1',
        hueConfig: {
          "target": this.path?this.path:'btnProps.background',
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
          'background': '#abcdef',
          'color': '#fff',
          'border-radius': '4px',
          'box-shadow': `#43a1ff 0px ${height*0.8} 0px 0px`,
          'border-color': 'transparent',
        }
      },
      btn2 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': '#abcdef',
          'color': '#fff',
          'border-radius': `${height*0.8}px`,
          'box-shadow': 'none',
          'border-color': 'transparent',
        }
      },
      btn3 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'color': '#abcdef',
          'background': 'none',
          'border-width': height*0.1+'px',
          'border-style': 'solid',
          'border-color': '#abcdef',
          'border-radius': '4px',
          'box-shadow': 'none',
        }
      },
      btn4 () {
        return {
          'background': '#abcdef',
          'color': '#fff',
          'border': 'none',
          'border-radius': '4px',
          'box-shadow': 'none',
          'border-color': 'transparent',
        }
      },
      btn5 () {
        let height = this.configData.btnProps.height;
        if (Object.prototype.toString.call(height) !== '[object Number]') {
          height = this.configData.btnProps.height.split('px')[0];
        }
        return {
          'background': '#abcdef',
          'color': '#fff',
          'border-radius': `${height*0.5}px 0px`,
          'box-shadow': 'none',
          'border-color': 'transparent',
        }
      },
      btn6 () {
        return {
          'background': 'transparent',
          'color': 'transparent',
          'box-shadow': 'none',
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
        this.activeBtn = style.className;
        this.changeStyle(BEFORE_UPDATE_COMPONENT_PROPS);
        Object.assign(this.configData.btnProps, this[style.className]);
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
      >div {
        flex: 1;
        min-width: 70px;
        height: 45px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 0 3px 10px 1px;
        text-align: center;
        line-height: 45px;
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
          background: #abcdef;
          color: #fff;
          border-radius: 4px;
          box-shadow: #43a1ff 0px 2px 0px 0px;
        }
        .btn2 {
          background: #abcdef;
          color: #fff;
          border-radius: 40px;
        }
        .btn3 {
          color: #abcdef;
          border: 1px solid #abcdef;
          border-radius: 4px;
        }
        .btn4 {
          background: #abcdef;
          color: #fff;
          border-radius: 4px;
        }
        .btn5 {
          background: #abcdef;
          border-radius: 110px 0px;
          color: #fff;
        }
        .btn7 {
          background: transparent;
          color: transparent;
        }
        .btn6 {
          background: transparent;
          border: 1px solid #fff;
          border-radius: 4px;
          color: #FFF;
        }
      }
      .active_btn {
        background: #ccc;
      }
    }
  }
</style>
