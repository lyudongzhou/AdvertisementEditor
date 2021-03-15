<template>
  <div class="basic_tab">
    <el-button type="primary" @click="choice"
      >选择<i class="el-icon-upload el-icon--right"></i
    ></el-button>
    <v-form direction="vertical" style="width: 100%; margin-top: 10px">
      <v-form-item label="切换时间（秒）" class="whiteClass">
        <v-input-number
          :min="1"
          :max="1000"
          v-model="value"
          @change="_handleChange"
          style="width: 100%"
        ></v-input-number>
      </v-form-item>
    </v-form>
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
  name: "mixPlayTab",
  components: get(REG_EDITORS),
  props: ["configData", "config"],
  mounted() {
    this.value = this.configData.props.changeTime;
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    // ...mapState(['schema']),
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    _handleChange(value) {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.changeTime": value,
        },
      });
    },
    choice() {
      this.$event.emit("openUploadWin", {
        onSelect: this.onSelect.bind(this),
        aSelectType: ["image", "video", "document"],
        multi: true,
        title: "混播",
      });
    },
    onSelect(a) {
      if (!a || a.length === 0) {
        return;
      }
      let arr = [];
      let arrResources = [];
      a.forEach((ele) => {
        let t = [];
        if (ele.resType === 4) {
          ele.imgList.forEach((ele) => {
            t.push({ sourcePaht: ele.sourcePaht, resType: 1 });
            arrResources.push({
              name: ele.resName,
              uuid: ele.uuid,
              url: ele.sourcePaht,
            });
          });
          arr.push.apply(arr, t);
        } else {
          arrResources.push({
            name: ele.resName,
            uuid: ele.uuid,
            url: ele.sourcePaht,
          });
          arr.push(ele);
        }
      });
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.components": arr,
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
