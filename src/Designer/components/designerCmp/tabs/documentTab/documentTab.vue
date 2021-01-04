<template>
  <div class="basic_tab">
    <el-button type="primary" @click="choice"
      >选择文档<i class="el-icon-upload el-icon--right"></i
    ></el-button>
  </div>
</template>

<script>
import "../../editors";
import { get } from "@/register";
import { REG_EDITORS } from "@/const";
import { mapMutations } from "../../../../store";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
// import { mapState } from '../../../../store'
export default {
  name: "documentTab",
  components: get(REG_EDITORS),
  props: ["configData", "config"],
  mounted() {},
  computed: {
    // ...mapState(['schema']),
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    choice() {
      this.$event.emit("openUploadWin", {
        onSelect: this.onSelect.bind(this),
        aSelectType: ["document"],
        multi: false,
        title: "文档",
      });
    },
    onSelect(a) {
      if (!a || a.length === 0) {
        return;
      }
      console.log(a);
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.url": a[0].resUrl,
        },
      });
    },
  },
};
</script>

<style lang="less" scope>
.basic_tab {
  display: flex;
  align-items: center;
}
</style>
