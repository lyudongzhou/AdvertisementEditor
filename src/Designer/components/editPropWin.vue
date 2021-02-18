<template>
  <el-dialog
    :title="title"
    :visible.sync="showEditWin"
    width="50%"
    :modal-append-to-body="false"
    :center="true"
    :before-close="handleClose"
    class="propWin"
  >
    <el-container class="dialogContainer">
      <el-main
        class="dialogMiddle"
        style="max-height: 350px; overflow-x: hidden; overflow-y: auto"
      >
        <component
          v-if="tab"
          :configData="currentComponent"
          :is="tab.type"
          :config="tab"
          class="tabInner"
        ></component>
      </el-main>
      <el-footer
        style="height: 10%; margin-top: 10px; bottom: 0; text-align: center"
        ><el-button style="width: 130px; height: 45px" @click="handleClose"
          >取消</el-button
        ><el-button
          style="
            width: 130px;
            height: 45px;
            background: #1391ff;
            color: #ffffff;
          "
          @click="commit"
          >确定</el-button
        ></el-footer
      >
    </el-container>
  </el-dialog>
</template>

<script>
import "./designerCmp";
import { REG_TABS } from "@/const";
import { get } from "@/register";
import { mapGetters } from "../store";
export default {
  components: { ...get(REG_TABS) },
  // computed: {},
  mounted() {
    this.$event.on("openEditWin", (config) => {
      this.start(config);
    });
  },
  data() {
    return {
      showEditWin: false,
      title: "编辑",
      tab: null,
      // currentComponent:null,
    };
  },
  computed:{
    ...mapGetters(["currentComponent"]),
  },
  methods: {
    start({ title, tab, cb }) {
      this.cb = cb;
      this.title = title;
      this.tab = tab;
      this.tab.isFirstEdit = true;
      this.showEditWin = true;
    },
    handleClose() {
      this.showEditWin = false;
      this.tab = null;
      this.tab.isFirstEdit = false;
      this.cb && this.cb(false);
    },
    commit() {
      this.showEditWin = false;
      this.tab = null;
      this.cb && this.cb(true);
    },
  },
};
</script>

<style>
</style>