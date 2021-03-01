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
        v-for="(item, index) in cmpConfig.props.data.component"
        :key="index"
        :label="
          item.compoType === 1 || item.compoType === 2 ? undefined : item.text
        "
      >
        <el-input
          v-if="item.compoType === 1 || item.compoType === 2"
          :rows="3"
          :type="item.compoType === 1 ? 'text' : 'textarea'"
          v-model="form[item['compoIndex']]"
          :placeholder="item['text']"
        ></el-input>
        <el-radio-group
          v-if="item.compoType === 3"
          v-model="form[item['compoIndex']]"
        >
          <el-radio
            v-for="(optionItem, index) in item.option"
            :key="index"
            :label="optionItem"
            >{{ optionItem }}</el-radio
          >
        </el-radio-group>
        <el-checkbox-group
          v-if="item.compoType === 4"
          v-model="form[item['compoIndex']]"
        >
          <el-checkbox
            v-for="(optionItem, index) in item.option"
            :key="index"
            :label="optionItem"
          ></el-checkbox>
        </el-checkbox-group>
        <el-rate
          v-if="item.compoType === 5"
          v-model="form[item['compoIndex']]"
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
    console.log(this.cmpConfig);
    let cmp = this.cmpConfig.props.data.component;
    for (let i in cmp) {
      if (cmp[i].compoType === 4) {
        this.form[cmp[i].compoIndex] = [];
      } else if (cmp[i].compoType === 5) {
        this.form[cmp[i].compoIndex] = null;
      }
    }
    this.btnText = this.cmpConfig.props.data.buttonText;
  },
  methods: {
    handleClick() {
      const {formStartDate, formfinishDate} = this.props;
      const startTimestamp = (new Date(formStartDate)).getTime();
      const finishTimestamp = (new Date(formfinishDate)).getTime();
      const now = (new Date()).getTime();
      if (now < startTimestamp) {
        alert("投票未开始");
        return;
      }
      if (now > finishTimestamp) {
        alert("投票已结束");
        return;
      }
      let o = {
        pluginId: this.cmpConfig.props.data.id,
        type: 2,
        component: [],
      };
      let cmp = this.cmpConfig.props.data.component;
      cmp.forEach((ele, index) => {
        if (ele.compoType === 1 || ele.compoType === 2) {
          o.component[index] = {
            compoType: ele.compoType,
            compoIndex: ele.compoIndex,
            textValue: this.form[ele.compoIndex],
          };
        } else if (ele.compoType === 3) {
          o.component[index] = {
            compoType: ele.compoType,
            compoIndex: ele.compoIndex,
            optionValue: [this.form[ele.compoIndex]],
          };
        } else if (ele.compoType === 4) {
          o.component[index] = {
            compoType: ele.compoType,
            compoIndex: ele.compoIndex,
            optionValue: this.form[ele.compoIndex],
          };
        } else if (ele.compoType === 5) {
          o.component[index] = {
            compoType: ele.compoType,
            compoIndex: ele.compoIndex,
            optionValue: [this.form[ele.compoIndex]],
          };
        }
      });
      o.component = JSON.stringify(o.component);
      this.$axios.post("/vote/add", o).then(() => {});
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