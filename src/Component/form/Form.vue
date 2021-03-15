<template>
  <baseCmp :cmpConfig="cmpConfig">
    <el-form
      ref="form"
      :model="form"
      label-width="100%"
      label-position="top"
      class="pluginForm"
    >
      <el-form-item
        v-for="(item, index) in cmpConfig.props.data.config.element"
        :key="index"
        :label="
          item.type === 'single-line' || item.type === 'multi-line'
            ? undefined
            : item.text
        "
      >
        <el-input
          v-if="item.type === 'single-line' || item.type === 'multi-line'"
          :rows="3"
          :type="item.type === 'single-line' ? 'text' : 'textarea'"
          v-model="form[item['uuid']]"
          :placeholder="item['text']"
        ></el-input>
        <el-radio-group
          v-if="item.type === 'single-choice'"
          v-model="form[item['uuid']]"
        >
          <el-radio
            v-for="(optionItem, index) in item.choices"
            :key="index"
            :label="optionItem.lavel"
            >{{ optionItem.text }}</el-radio
          >
        </el-radio-group>
        <el-checkbox-group
          v-if="item.type === 'multi-choice'"
          v-model="form[item['uuid']]"
        >
          <el-checkbox
            v-for="(optionItem, index) in item.choices"
            :key="index"
            :label="optionItem.text"
          ></el-checkbox>
        </el-checkbox-group>
        <el-rate
          v-if="item.type === 'star'"
          v-model="form[item['uuid']]"
          :colors="['#44A5FF', '#44A5FF', '#44A5FF']"
        >
        </el-rate>
      </el-form-item>
      <el-button type="primary" @click="handleClick">{{ btnText }}</el-button>
    </el-form>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";

export default {
  name: "formCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data() {
    return {
      form: {},
      activate: -1,
      checkList: ["选中且禁用", "复选框 A"],
      btnText: "提交",
    };
  },
  created() {
    this.cmpConfig.props.data.config = JSON.parse(
      this.cmpConfig.props.data.json
    );
    console.log(this.cmpConfig.props.data.config);
    let cmp = this.cmpConfig.props.data.component;
    for (let i in cmp) {
      if (cmp[i].type === "multi-choice") {
        this.form[cmp[i].uuid] = [];
      } else if (cmp[i].type === "star") {
        this.form[cmp[i].uuid] = null;
      }
    }
    this.btnText = this.cmpConfig.props.data.config["commit-button-text"];
  },
  methods: {
    handleClick() {
      if (this.$store.state.currentRenderState.designMode) {
        return;
      }
      // const {formStartDate, formfinishDate} = this.props.data.config;
      // let formStartDate = this.props.data.config["start-time"];
      // let formfinishDate = this.props.data.config["finish-time"];
      // const startTimestamp = (new Date(formStartDate)).getTime();
      // const finishTimestamp = (new Date(formfinishDate)).getTime();
      // const now = (new Date()).getTime();
      // if (now < startTimestamp) {
      //   alert("投票未开始");
      //   return;
      // }
      // if (now > finishTimestamp) {
      //   alert("投票已结束");
      //   return;
      // }
      console.log(this.cmpConfig.props.data.config);
      function dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(), // 年
          "m+": (date.getMonth() + 1).toString(), // 月
          "d+": date.getDate().toString(), // 日
          "H+": date.getHours().toString(), // 时
          "M+": date.getMinutes().toString(), // 分
          "S+": date.getSeconds().toString(), // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
          }
        }
        return fmt;
      }
      let o = {
        uuid: this.cmpConfig.props.data.config.uuid,
        "commit-time": dateFormat("YYYY-mm-dd HH:MM:SS",new Date().getTime()),
        element: [],
      };
      let cmp = this.cmpConfig.props.data.config.element;
      cmp.forEach((ele, index) => {
        o.element[index] = {
          uuid: ele.uuid,
          answer: this.form[ele.uuid],
        };
      });
      o.component = JSON.stringify(o.component);
      this.$axios
        .post("/vote/add", {
          pluginId: this.props.data.id,
          deviceCode: "",
          planUuid: "",
          prograUuid: "",
          json: JSON.stringify(o),
        })
        .then(() => {});
    },
  },
  computed: {
    props() {
      return this.cmpConfig.props || {};
    },
    //    width() {
    //      return this.cmpConfig.layoutConfig.width;
    //    }
    ...mapGetters(["handleUrl", "designMode"]),
  },
};
</script>

<style lang="less">
.pluginForm {
  width: 100%;
  padding: 15px;
  .el-form-item {
    border-radius: 4px;
    border: 2px solid #44a5ff;
    margin-bottom: 12px;
    .el-form-item__label {
      width: 100%;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      line-height: 22px;
      border-bottom: 2px solid #44a5ff;
    }
    .el-form-item__content {
      .el-input {
        .el-input__inner {
          background-color: transparent;
        }
        .el-input__inner::-webkit-input-placeholder {
          /*Webkit browsers*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-input__inner::-moz-placeholder {
          /*Mozilla Firefox 4 to 8*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-input__inner::moz-placeholder {
          /*Mozilla Firefox 19+*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-input__inner::-ms-input-placeholder {
          /*Internet Explorer 10+*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
      }
      .el-textarea {
        .el-textarea__inner {
          background-color: transparent;
        }
        .el-textarea__inner::-webkit-input-placeholder {
          /*Webkit browsers*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-textarea__inner::-moz-placeholder {
          /*Mozilla Firefox 4 to 8*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-textarea__inner::moz-placeholder {
          /*Mozilla Firefox 19+*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
        .el-textarea__inner::-ms-input-placeholder {
          /*Internet Explorer 10+*/
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
      }
    }
  }
  .el-button {
    width: 100%;
    background: #44a5ff;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 22px;
  }
}
</style>