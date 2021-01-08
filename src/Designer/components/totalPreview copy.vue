<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-21 00:38:50
 * @LastEditTime: 2020-12-21 02:27:40
 * @Description: file content
-->
<template>
  <el-container v-if="isShow" class="style1">
    <el-aside width="75%">
      <div class="relative">
        <singlePagePreview class="previewPage"></singlePagePreview>
        <el-button
          v-if="!previewTotal"
          class="singleCloseBtn"
          @click="cancelChange"
          >关闭</el-button
        >
      </div>
    </el-aside>
    <el-main v-if="previewTotal" style="padding: 0; background-color: #535353">
      <el-header class="switch_header" style="padding: 0; height: 37px">
        <div
          v-for="list in switchList"
          :key="list.id"
          :class="{ switch_list: true, active: select === list.id }"
          @click="onSwitchList(list.id)"
        >
          {{ list.name }}
        </div>
      </el-header>
      <el-main style="background-color: #535353; height: 800px; color: white">
        <div v-if="select === 1">
          <div>
            <div style="float: left; width: 50%; height: 200px">
              <img style="width: 100%; height: 100%" />
            </div>
            <div
              style="
                float: right;
                width: 50%;
                height: 200px;
                padding: 0 0 0 10px;
              "
            >
              <span>节目名称</span>
              <el-input style="margin: 10px 0"></el-input>
              <span>描述</span>
              <el-input type="textarea" style="margin-top: 10px"></el-input>
            </div>
            <div style="display:flex">
              <div>背景音乐</div>
              <div>
                <span class="backgroundInput">abc</span>
                <span class="backgroundButton"
                  >背景音乐自动播放<el-button>ON</el-button></span
                >
                <div>
                  <el-form>
                    <el-form-item label="背景音量"
                      ><el-slider
                        v-model="volume"
                      ></el-slider
                    ></el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer style="position: absolute; bottom: 0">
        <el-button @click="commitChange">确定</el-button>
        <el-button @click="cancelChange">取消</el-button>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import singlePagePreview from "./preView";
import { mapMutations, mapState } from "../store";
export default {
  methods: {
    ...mapMutations(["setPreviewState"]),
    handlePreview() {
      this.setPreviewState({ previewTotal: true, previewing: true });
    },
    onSwitchList(id) {
      this.select = id;
    },
    commitChange() {
      this.setPreviewState({ previewing: false });
    },
    cancelChange() {
      this.setPreviewState({ previewing: false });
    },
  },
  watch: {
    previewing(data) {
      this.isShow = data;
    },
  },
  computed: {
    ...mapState(["previewing", "previewTotal"]),
  },
  components: { singlePagePreview },
  data() {
    return {
      isShow: false,
      select: 1,
      switchList: [
        {
          id: 1,
          name: "常用设置",
        },
        {
          id: 2,
          name: "翻页效果",
        },
      ],
      volume: 10,
    };
  },
  created() {
    window.acc = this;
  },
};
</script>

<style scoped>
.backgroundVolume {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.backgroundInput {
  background: white;
  color: black;
  border-radius: 4px;
  width: 50%;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  margin-right: 20px;
}
.backgroundButton {
  border: 1px solid white;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.style1 {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
}
.previewPage {
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.relative {
  position: relative;
  width: 100%;
  height: 100%;
}
.switch_header {
  display: flex;
  height: 37px;
}
.switch_list {
  width: 50%;
  background-color: #424242;
  text-align: center;
  line-height: 37px;
  color: #b5b5b5;
  cursor: default;
  border: 1px solid #383838;
}
.switch_list:hover {
  background-color: #535353;
  color: white;
  cursor: pointer;
}
.switch_list.active {
  background-color: #535353;
  color: white;
  cursor: pointer;
  border-bottom: 0;
}
.singleCloseBtn {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
