<template>
  <div class="basic_tab">
    <el-form ref="form" label-width="50px" size="mini" label-position="left">
      <el-button-group>
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
      </el-button-group>
      <el-form-item
        :label="editor.label"
        v-for="(editor, index) in editors"
        :key="index"
      >
        <component
          :is="editor.type"
          :configData="configData"
          :config="editor"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "../../editors";
import { get } from "@/register";
import { REG_EDITORS } from "@/const";
import { mapState } from "../../../../store";
import updateThrottle from "../../../../manager/updateThrottle";
export default {
  name: "layoutTab",
  components: get(REG_EDITORS),
  props: ["configData", "config"],
  mounted() {},
  computed: {
    ...mapState(["schema"]),
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case "top0":
          updateThrottle.update("layoutConfig.top", 0, true);
          break;
        case "top50":
          updateThrottle.update(
            "layoutConfig.top",
            this.schema.container.height * 0.5 -
              0.5 * this.configData.layoutConfig.height,
            true
          );
          break;
        case "top100":
          updateThrottle.update(
            "layoutConfig.top",
            this.schema.container.height -
              this.configData.layoutConfig.height,
            true
          );
          break;
        case "left0":
          updateThrottle.update("layoutConfig.left", 0, true);
          break;
        case "left50":
          updateThrottle.update(
            "layoutConfig.left",
            0.5 *
              (this.schema.container.width -
                this.configData.layoutConfig.width),
            true
          );
          break;
        case "left100":
          updateThrottle.update(
            "layoutConfig.left",
            this.schema.container.width - this.configData.layoutConfig.width,
            true
          );
          break;
      }
    },
  },
  data() {
    return {
      editors: [
        {
          label: "X",
          props: {},
          target: "layoutConfig.left",
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
          label: "旋转",
          props: {},
          target: "layoutConfig.rotation",
          type: "numberField",
        },
      ],
    };
  },
};
</script>

<style lang="less">
.basic_tab {
  .el-form {
    .el-form-item:last-child {
      margin: 0;
    }
  }
}
</style>
