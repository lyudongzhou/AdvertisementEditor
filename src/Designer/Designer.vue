<template>
  <div @contextmenu.prevent="onContextmenu">
    <el-container
      class="full-height"
      :style="{ filter: `blur(${previewing ? 30 : 0}px)` }"
    >
      <el-header class="no-padding" height="55px">
        <designer-header></designer-header>
      </el-header>
      <el-container class="main-container">
        <el-aside width="270px">
          <editor></editor>
        </el-aside>

        <el-main class="no-padding">
          <content-display></content-display>
        </el-main>

        <el-aside width="50px">
          <designer-operator></designer-operator>
        </el-aside>
        <el-aside style="width: 298px; overflow: inherit">
          <PageFrame></PageFrame>
        </el-aside>
        <edit-chart-window></edit-chart-window>
        <programDialog></programDialog>
        <editPropWin></editPropWin>
        <svgWin></svgWin>
        <dialogWin></dialogWin>
      </el-container>
      <prompt-dialog></prompt-dialog>
    </el-container>
    <!-- <singlePagePreview></singlePagePreview> -->
    <pageSnapshot></pageSnapshot>

    <totalPreview></totalPreview>
    <resourceDialg></resourceDialg>
    <key-map></key-map>
    <editorWin ref="editorWin" :parentWidth="workspaceWidth"></editorWin>
  </div>
</template>

<script>
import DesignerHeader from "./components/DesignerHeader.vue";
import PageFrame from "./components/PageFrame.vue";
import ContentDisplay from "./components/ContentDisplay.vue";
import DesignerOperator from "./components/DesignerOperator.vue";
import Editor from "./components/Editor.vue";
import pageSnapshot from "./components/pageSnapshot.vue";
import resourceDialg from "./components/pageCmp/UploadFile";
import programDialog from "./components/ProgramConfig";
import { mapMutations } from "./store";
import totalPreview from "./components/totalPreview";
import EditChartWindow from "./components/EditChartWindow.vue";
import editPropWin from "./components/editPropWin";
import svgWin from "./components/popupCmp/moreSvg";
import dialogWin from "./components/popupCmp/pluginList";
import promptDialog from "./components/promptDialog";
import KeyMap from "./components/KeyMap.vue";
import editorWin from "./components/EditorWindow";
// import singlePagePreview from "./components/preView";
import { mapState } from "./store";
export default {
  name: "designer",
  components: {
    DesignerHeader,
    PageFrame,
    ContentDisplay,
    DesignerOperator,
    Editor,
    pageSnapshot,
    EditChartWindow,
    // singlePagePreview,
    totalPreview,
    resourceDialg,
    KeyMap,
    programDialog,
    editPropWin,
    svgWin,
    promptDialog,
    dialogWin,
    editorWin
  },
  computed: {
    ...mapState(["previewing"]),
  },
  mounted() {},
  data() {
    return {
      workspaceWidth: document.body.clientWidth,
    };
  },
  methods: {
    openProject(schema) {
      this.resetSchema(schema);
    },
    ...mapMutations(["resetSchema"]),
    onContextmenu() {},
  },
};
</script>

<style lang="less">
.main-container {
  overflow: hidden;
  height: calc(100vh - 55px);
  .no-padding {
    position: relative;
  }
}
</style>
