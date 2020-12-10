<template>
  <div class="flex-column them-dark-bg full-height them-dark-text">
    <el-tooltip
        v-for="config in operators"
        :content="config.label" placement="left"
        :key="config.key"
    >
      <i :class="config.icon"
         @click="handleClick(config.key, config.disabled)"
      ></i>
    </el-tooltip>

  </div>
</template>

<script>
  import { CHANGE_SCALE } from "../constant/event";
  import { SCALE_STEP } from "../constant/base";
  import { getSchemaManager } from "../manager/schemaManager";
  import { mapMutations} from "../store";

  export default {
    components: {},
    created() {},
    data() {
      return {};
    },
    computed: {
      operators() {
        const schemaManager = getSchemaManager();
        return [
          {
            icon: "el-icon-top-left",
            key: "undo",
            label: "撤销",
            disabled: !schemaManager.canUndo(),
          },
          {
            icon: "el-icon-top-right",
            key: "redo",
            label: "恢复",
            disabled: !schemaManager.canRedo(),
          },
          { icon: "el-icon-zoom-in", key: "zoomIn", label: "放大" },
          { icon: "el-icon-zoom-out", key: "zoomOut", label: "缩小" },
          { icon: "el-icon-view", key: "preview", label: "预览" },
          { icon: "el-icon-delete", key: "clear", label: "清空" },
        ];
      },
    },
    methods: {
      handleClick(key, disabled) {
        if (disabled) {
          return;
        }
        switch (key) {
          case "zoomIn":
            this.$event.emit(CHANGE_SCALE, SCALE_STEP);
            break;
          case "zoomOut":
            this.$event.emit(CHANGE_SCALE, -SCALE_STEP);
            break;
          case "undo":
            this.undo();
            break;
          case "redo":
            this.redo();
            break;
          case "preview":
            this.setPreviewState({previewTotal:false,previewing:true});
            break;
        }
      },
      ...mapMutations(["redo", "undo","setPreviewState"]),
    },
  };
</script>

<style lang="less" scoped>
  .flex-column {
    background: #4C4C4C;
    cursor: pointer;
    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      border: 1px solid #363636;
      box-sizing: border-box;
    }
  }
</style>
