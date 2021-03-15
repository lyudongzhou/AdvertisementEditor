<template>
  <div class="basic_tab">
    <el-button type="primary" @click="choice"
      >选择<i class="el-icon-upload el-icon--right"></i
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
  name: "imageTab",
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
        aSelectType: ["video"],
        multi: false,
        title: "视频",
      });
    },
    onSelect(a) {
      if (!a || a.length === 0) {
        return;
      }
      let arrResources = [{
          name:a[0].resName,
          uuid:a[0].uuid,
          url:a[0].sourcePaht
        }];
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.bgUrl": a[0].sourcePaht,
          "props.arrResources":arrResources
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
