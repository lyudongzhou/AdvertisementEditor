<template>
  <div class="basic_tab">
    <el-button type="primary" @click="choice"
      >选择<i class="el-icon-upload el-icon--right"></i
    ></el-button>
    <v-form direction="vertical" style="width: 100%; margin-top: 10px">
      <v-form-item>
        <div class="imageTab" style="width: 100%">
          <div class="selectAutoPlay blackFont" @click="handleLoop">
            循环播放
            <div class="autoPlaySwitch">
              {{ configData.props.loop ? "ON" : "OFF" }}
            </div>
          </div>
        </div>
      </v-form-item>
    </v-form>
    <div
      style="position: relative; margin: 10px; color: '#606266'"
      v-for="(img, index) in configData.props.bgUrl"
      :key="index"
    >
      <video style="width: 100%; height: 100px" :src="img"></video>
      <i
        v-if="configData.props.bgUrl.length > 1"
        class="el-icon-delete deleteIcon"
        @click="onClickDeleteSelect(index)"
      >
      </i>
    </div>
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
    onClickDeleteSelect(index){
      let { bgUrl,  arrResources } = this.configData.props;
      bgUrl.splice(index, 1);
      arrResources.splice(index, 1);
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.bgUrl": bgUrl,
          "props.arrResources": arrResources,
        },
      });
    },
    choice() {
      this.$event.emit("openUploadWin", {
        onSelect: this.onSelect.bind(this),
        aSelectType: ["video"],
        multi: false,
        title: "视频",
      });
    },
    handleLoop() {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.loop": !this.configData.props.loop,
        },
      });
    },
    onSelect(a) {
      if (!a || a.length === 0) {
        return;
      }
      let arr = [];
      let arr1 = [];
      a.forEach((ele) => {
        arr1.push(ele.sourcePaht);
        arr.push({
          name: ele.resName,
          uuid: ele.uuid,
          url: ele.sourcePaht,
          payload:ele
        });
      });
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.bgUrl": arr1,
          "props.arrResources": arr,
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
