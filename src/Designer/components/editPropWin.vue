<template>
  <el-dialog
    :title="title"
    :visible.sync="showEditWin"
    width="75%"
    :modal-append-to-body="false"
    :center="true"
    :before-close="handleClose"
  >
    <div style="height: 200px">
      <component
        :is="tab.type"
        :configData="defaultSchema"
        :config="tab"
        class="tabInner"
      ></component>
    </div>
  </el-dialog>
</template>

<script>
import "./designerCmp";
import { REG_TABS } from "@/const";
import { get } from "@/register";
export default {
  components: { ...get(REG_TABS) },
  computed: {},
  data() {
    return {
      showEditWin: false,
      title: "编辑",
      tab: {
        type: "textTab",
        name: "文本配置",
        notSupport: "",
        children: [],
      },
      defaultSchema: {
        name: "按钮1",
        type: "textCmp",
        layoutConfig: {
          width: 100,
          height: 30,
        },
        props: {
          text: "文本",
          fontFamily: "微软雅黑",
          fontStyle: "normal",
          fontSize: 30,
          color: "#000000",
          fontAlign: "left",
          fontWeight: "normal",
        },
        animation: [],
        events: [],
        children: [],
      },
    };
  },
  methods: {
    handleClose() {},
  },
};
</script>

<style>
</style>