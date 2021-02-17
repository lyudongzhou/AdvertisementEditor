<template>
  <div
    class="flex-container them-dark-bg them-dark-text space-around full-height"
  >
    <div class="full-width">
      <div class="left-operator">
        <span class="configBtn" @click="showProgramConfig"
          ><span
            :style="{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              'margin-top': '5px',
              'margin-right': '8px',
              'background-image': `url(${icon})`,
            }"
          ></span
          >节目设置</span
        >
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
import { mapMutations } from "../store";
import icon from "../public/configIcon.png";
export default {
  components: {
    Components,
    MainOperators,
  },
  data() {
    return {
      icon: null,
    };
  },
  created() {
    this.icon = icon;
    console.log("ly", icon);
  },
  methods: {
    ...mapMutations(["showProgramConfig"]),
  },
};
</script>
<style lang="less">
.configBtn {
  width: 110px;
  height: 34px;
  background: #999999;
  border-radius: 8px;
  margin-left: 70px;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 34px;
  margin-top: 10px;
  cursor: pointer;
}
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