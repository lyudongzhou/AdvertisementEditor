<template>
  <el-dialog
    title="节目设置"
    :visible="isShowProgram"
    width="50%"
    :modal-append-to-body="false"
    @close="close"
  >
    <v-form direction="horizontal">
      <v-form-item
        label="节目名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-input placeholder="请输入" size="large" v-model="projectInfo.name"></v-input>
      </v-form-item>
      <v-form-item
        label="分辨率"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-select
          placeholder="请选择"
          :data="options"
          @change="change"
          :value="ratio"
        ></v-select>
      </v-form-item>
      <v-form-item
        v-if="isShowConfig"
        label="自定义"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-form direction="inline">
          <v-form-item>
            <v-input-number @change="width = arguments[0]" :value="width" :min="0"></v-input-number>
          </v-form-item>
          <v-form-item> x </v-form-item>
          <v-form-item>
            <v-input-number @change="height = arguments[0]" :value="height" :min="0"></v-input-number>
          </v-form-item>
        </v-form>
      </v-form-item>
    </v-form>
    <div slot="footer">
      <el-button @click="commit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "../store";
import {
  UPDATE_BGM_BEFORE,
  UPDATE_BGM_AFTER,
} from "../constant/schema";
export default {
  name: "ProgramConfig",
  methods: {
    ...mapMutations(["updateSchema","hideProgramConfig"]),
    commit() {
      this.updateSchema({
        type: UPDATE_BGM_BEFORE,
        value: {},
      });
      this.updateSchema({
        type: UPDATE_BGM_AFTER,
        value: {
            "container.width":this.width,
            "container.height":this.height
        },
      });
      this.close();
    },
    close(){
        this.hideProgramConfig();
    },
    change(val) {
      var a = val.split("*");
      if (a.length === 1) {
        this.width = 0;
        this.height = 0;
      } else {
        this.width = a[0];
        this.height = a[1];
      }
    },
  },
  watch: {
    realWidth(value) {
      this.width = value;
    },
    realHeight(value) {
      this.height = value;
    },
  },
  computed: {
    ...mapState(["schema","isShowProgram","projectInfo"]),
    isShowConfig() {
      return this.ratio === "userConfig";
    },
    ratio() {
      let text = `${this.width}*${this.height}`;
      let hasFound = false;
      this.options.some((ele) => {
        if (ele.value === text) {
          hasFound = true;
        }
        return hasFound;
      });
      if (!hasFound) {
        text = "userConfig";
      }
      return text;
    },
    realWidth() {
      if (!this.schema.container) {
        return 0;
      }
      return this.schema.container.width;
    },
    realHeight() {
      if (!this.schema.container) {
        return 0;
      }
      return this.schema.container.height;
    },
  },
  data() {
    return {
      selectValue: "",
      width: 0,
      height: 0,
      options: [
        {
          value: "1920*1080",
          label: "1920*1080",
        },
        {
          value: "1920*1440",
          label: "1920*1440",
        },
        {
          value: "userConfig",
          label: "自定义",
        },
      ],
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
  },
};
</script>

<style>
</style>