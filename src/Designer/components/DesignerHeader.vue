<template>
  <div
    class="flex-container them-dark-bg them-dark-text space-around full-height"
  >
    <div class="full-width">
      <div class="left-operator">
        <el-button type="programConfig" @click="showProgramConfig">节目设置</el-button>
      </div>
    </div>
    <div class="full-width">
      <components></components>
    </div>
    <div class="full-width text-right">
      <main-operators></main-operators>
    </div>
  </div>
</template>

<script>
import Components from "./Components.vue";
import MainOperators from "./MainOperator.vue";
import {mapMutations} from "../store";
export default {
  components: {
    Components,
    MainOperators,
  },
  methods:{
    ...mapMutations(["showProgramConfig"])
  }
};
</script>
<style lang="less">
.left-operator {
  padding-left: 10px;
  line-height: 55px;

  .el-button {
    height: 36px;
    background: #6e6f71;
    color: #fff;
    border-radius: 5px;
    border: none;
    &:hover,
    &:active,
    &:focus {
      background: #6e6f71;
      color: #fff;
      opacity: 0.8;
    }

    &.is-plain {
      background: #ececec;
      color: #333;
      &:hover,
      &:active,
      &:focus {
        background: #ececec;
        color: #333;
        opacity: 0.8;
      }
    }
  }
}
</style>