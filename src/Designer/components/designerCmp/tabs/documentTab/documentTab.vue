<template>
  <div class="basic_tab">
    <el-button type="primary" @click="choice"
      >选择<i class="el-icon-upload el-icon--right"></i
    ></el-button>

    <v-form direction="vertical" style="width: 100%; margin-top: 10px">
      <v-form-item>
        <div class="imageTab" style="width: 100%">
          <div class="selectAutoPlay blackFont" @click="handleAutoPlay">
            自动切换
            <div class="autoPlaySwitch">
              {{ configData.props.autoChange ? "ON" : "OFF" }}
            </div>
          </div>
        </div>
      </v-form-item>
      <v-form-item label="切换效果" class="whiteClass">
        <v-select
          placeholder="请选择效果"
          style="width: 100%"
          :data="options"
          @change="change"
          :maxHeight="200"
          :value="valueType"
        ></v-select>
      </v-form-item>
      <v-form-item label="切换时间" class="whiteClass">
        <v-input-number
          :min="1"
          :max="1000"
          v-model="value"
          @change="_handleChange"
          style="width: 100%"
        ></v-input-number>
      </v-form-item>
    </v-form>
    <el-image
      style="width: 100%; height: 100px; margin: 10px"
      v-for="(img, index) in configData.props.bgUrl"
      :key="index"
      :src="img"
      fit="fill"
    ></el-image>
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
  mounted() {
    // window.tab = this;
    this.value = this.configData.props.changeTime;
    this.valueType = this.configData.props.changeType;
  },
  computed: {
    // ...mapState(['schema']),
  },
  data() {
    return {
      value: 1,
      valueType:"",
      options: [
        { label: "淡入", value: "fade" },
        { label: "淡入淡出", value: "kenburn" },
        { label: "滑动", value: "Swipe" },
        { label: "瀑布", value: "waterfall" },
        { label: "拉链", value: "zip" },
        { label: "百叶", value: "blinds2d" },
        { label: "分块1", value: "blocks1" },
        { label: "分块2", value: "block2" },
        { label: "圆形", value: "concentric" },
        { label: "圆形2", value: "warp" },
        { label: "相机", value: "camera" },
        { label: "旋转", value: "cube" },
        { label: "书", value: "book" },
        { label: "落下", value: "fall" },
        { label: "波浪", value: "wave" },
        { label: "百叶3d", value: "blinds3d" },
        { label: "分块旋转", value: "round1" },
        { label: "分块旋转2", value: "round2" },
        { label: "爆炸", value: "explode" },
      ],
    };
  },
  watch: {
    
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    change(value) {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.changeType": value,
        },
      });
    },
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
        aSelectType: ["document"],
        multi: true,
        title: "文档",
      });
    },
    handleAutoPlay() {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.autoChange": !this.configData.props.autoChange,
        },
      });
    },
    onSelect(a) {
      if (!a || a.length === 0) {
        return;
      }
      let arr = [];
      a.forEach((ele) => {
        arr.push.apply(arr,ele.imgList);
      });
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          "props.bgUrl": arr,
        },
      });
    },
  },
};
</script>

<style lang="less">
@deep: ~">>>";
.ant-form-item-label label {
  color: 100px;
}
.whiteClass {
  .ant-form-item-label label {
    color: white;
  }
}
.imageTab {
  .selectAutoPlay.blackFont {
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: white;
    width: 100%;
    height: 26px;
    cursor: pointer;
    position: relative;
  }
}

.autoPlaySwitch {
  position: absolute;
  right: 10px;
  top: -2px;
  width: 30px;
  height: 22px;
  text-align: center;
}
.basic_tab {
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-items: center;
}
</style>
