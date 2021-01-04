<template>
  <div class="basic_tab">
    <el-form ref="form" size="mini" label-position="left" style="width: 100%">
      <!-- <el-button-group style="width:100%;display:flex;justify-content:center;padding-bottom:20px">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleClick('top0')"
                ></el-button>
                <el-button
                    type="primary"
                    icon="el-icon-share"
                    size="mini"
                    @click="handleClick('top50')"
                ></el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="handleClick('top100')"
                ></el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="handleClick('left0')"
                ></el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="handleClick('left50')"
                ></el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="handleClick('left100')"
                ></el-button>
            </el-button-group> -->
      <el-form-item
        :label="editor.label"
        v-for="(editor, index) in editors"
        :key="index"
        style="width: 100%"
      >
        <component
          :is="editor.type"
          :configData="configData"
          :config="editor"
          style="width: 100%"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "../../editors";
import { get } from "@/register";
import { REG_EDITORS } from "@/const";
import { mapState, mapMutations } from "../../../../store";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
export default {
  name: "layoutTab",
  components: get(REG_EDITORS),
  props: ["configData", "config"],
  mounted() {},
  computed: {
    ...mapState(["schema"]),
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    changeFun(path, value) {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          [path]: value,
        },
      });
    },
    handleClick(type) {
      console.log(1);
      switch (type) {
        case "top0":
          this.changeFun("layoutConfig.top", 0);
          break;
        case "top50":
          this.changeFun(
            "layoutConfig.top",
            this.schema.container.height * 0.5 -
              0.5 * this.configData.layoutConfig.height
          );
          break;
        case "top100":
          this.changeFun(
            "layoutConfig.top",
            this.schema.container.height - this.configData.layoutConfig.height
          );
          break;
        case "left0":
          this.changeFun("layoutConfig.left", 0);
          break;
        case "left50":
          this.changeFun(
            "layoutConfig.left",
            0.5 *
              (this.schema.container.width - this.configData.layoutConfig.width)
          );
          break;
        case "left100":
          this.changeFun(
            "layoutConfig.left",
            this.schema.container.width - this.configData.layoutConfig.width
          );
          break;
      }
    },
  },
  data() {
    return {
      editors: [
        {
          label: "名称",
          props: {},
          target: "name",
          type: "textField",
        },
        {
          label: "旋转角度",
          props: {},
          target: "layoutConfig.rotation",
          type: "numberField",
        },
        {
          label: "左边距",
          props: {},
          target: "layoutConfig.left",
          type: "numberField",
        },
        {
          label: "上边距",
          props: {},
          target: "layoutConfig.top",
          type: "numberField",
        },
        {
          label: "宽度",
          props: {
            min: 1,
            max: 3000,
          },
          target: "layoutConfig.width",
          type: "numberField",
        },
        {
          label: "高度",
          props: {
            min: 1,
            max: 3000,
          },
          target: "layoutConfig.height",
          type: "numberField",
        },
        {
          label: "不透明度",
          props: {},
          target: "layoutConfig.opacity",
          type: "numberField",
        },
      ],
    };
  },
};
</script>

<style lang="less">
.basic_tab {
  padding: 16px 26px;
  .el-form {
    .el-form-item:last-child {
      margin: 0;
    }
  }
}
</style>
