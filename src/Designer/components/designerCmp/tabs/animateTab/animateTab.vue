<template>
  <el-collapse v-model="activeName" accordion class="container">
    <el-collapse-item
      v-for="(item, index) in configData.animation"
      :key="index"
      :title="`动画${index + 1}`"
      :name="index"
      class="collapse-item"
    >
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
export default {
  props: ["configData", "config"],
  components: { animateContainer },
  created() {
    //   this.iconBg = bg;
  },
  methods: {},
  data() {
    return {
      activeName: 0,
    };
  },
};
</script>

<style scoped lang="less">
.container {
  .collapse-item {
    background-color:transparent;
    .tabInner {
      background-color: #cccccc;
    }
  }
}
</style>