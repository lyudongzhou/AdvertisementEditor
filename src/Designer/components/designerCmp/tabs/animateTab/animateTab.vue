<template>
  <el-collapse v-model="activeName" accordion class="container">
    <div class="configBtnContainer">
      <span class="configBtn" @click="addAnimate()">添加</span
      ><span class="configBtn" @click="play()">播放</span>
    </div>
    <el-collapse-item
      v-for="(item, index) in configData.animation"
      :key="index"
      :name="index"
      class="collapse-item"
    >
      <template slot="title">
        {{ `动画${index + 1}`
        }}<el-button
          style="margin: 0 10px 0 auto"
          circle
          icon="el-icon-delete"
          size="mini"
          @click.stop="deleteAnimate(index)"
        ></el-button>
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
import { mapMutations,mapGetters } from "../../../../store";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
export default {
  props: ["configData", "config"],
  components: { animateContainer },
  created() {
    
    //   this.iconBg = bg;
  },
  computed:{
    ...mapGetters(['components']),
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    play(){
      this.$event.emit("currentComponentOperate",function(vm){
        vm.$refs.parent.idleAction(true);
      });
    },
    deleteAnimate(index) {
      let anis = JSON.parse(JSON.stringify(this.configData.animation));
      anis.splice(index,1);
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
.configBtnContainer {
  display: flex;
  justify-content: center;
}
.configBtn:hover {
  background-color: gray;
}
.configBtn {
  width: 120px;
  height: 30px;
  align-items: center;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  border-color: black;
  border-width: 1px;
  border: 1px solid black;
}
.container {
  .collapse-item {
    background-color: transparent;
    .tabInner {
      background-color: #cccccc;
    }
  }
}
</style>