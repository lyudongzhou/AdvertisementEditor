<template>
  <el-collapse v-model="activeName" accordion class="container">
    <div class="configBtnContainer">
      <span class="configBtn" @click="addAnimate()"
        ><i style="padding-right: 10px" class="el-icon-circle-plus-outline"></i
        >添加</span
      ><span class="configBtn" @click="play()"
        ><i style="padding-right: 10px" class="el-icon-video-play"></i
        >播放</span
      >
    </div>
    <el-collapse-item
      v-for="(item, index) in configData.animation"
      :key="index"
      :name="index"
      class="collapse-item"
    >
      <template slot="title">
        <span
          style="margin: 0 10px 0 10px"
          class="arrow el-icon-caret-right"
        ></span>
        <span
          style="margin: 0 10px 0 10px"
          class="arrowexpand el-icon-caret-bottom"
        ></span>
        {{ `动画${index + 1}` }}
        <span
          style="margin: 0 10px 0 auto"
          class="el-icon-delete"
          @click.stop="deleteAnimate(index)"
        >
        </span>
      </template>
      <animateContainer
        class="tabInner"
        :configData="configData"
        :index="index"
      ></animateContainer>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import animateContainer from "./animateContainer";
import { mapMutations, mapGetters } from "../../../../store";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
export default {
  props: ["configData", "config"],
  components: { animateContainer },
  created() {
    //   this.iconBg = bg;
  },
  computed: {
    ...mapGetters(["components"]),
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    play() {
      this.$event.emit("currentComponentOperate", function (vm) {
        vm.$refs.parent.idleAction(true);
      });
    },
    deleteAnimate(index) {
      let anis = JSON.parse(JSON.stringify(this.configData.animation));
      anis.splice(index, 1);
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          [`animation`]: anis,
        },
      });
    },
    addAnimate() {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          [`animation.${this.configData.animation.length}`]: {
            type: "enfromtop",
            duration: 1,
            delay: 0,
            times: 1,
          },
        },
      });
    },
  },
  data() {
    return {
      activeName: 0,
    };
  },
};
</script>

<style scoped lang="less">
@deep: ~">>>";
.configBtnContainer {
  display: flex;
  justify-content: center;
  color: white;
}
.configBtn:hover {
  background-color: gray;
}
.configBtn {
  width: 50%;
  height: 30px;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 30px;
  cursor: pointer;
}
.container {
  .collapse-item {
    @{deep} .el-collapse-item__arrow {
      display: none;
    }
    @{deep} .el-collapse-item__header {
      background: #535353;
      padding-left: 25px;
    }
    @{deep} .tabInner {
      background-color: transparent;
      padding-right: 0;
      padding-left: 0;
    }
    .arrow {
      display: inherit;
    }
    .arrowexpand {
      display: none;
    }
    @{deep} .el-collapse-item__header.is-active {
      .arrow {
        display: none;
      }
      .arrowexpand {
        display: inherit;
      }
    }
  }
}
</style>