<template>
  <div>
    <ul class="switchPanelContainer">
      <li
        v-for="(panel, index) in panelConfig"
        :key="index"
        :class="caculateSwitchPanelClass(index)"
        @click="activeTab = index"
      >
        {{ panel.name }}
      </li>
    </ul>
    <div v-for="(panel, i) in panelConfig" :key="i">
      <ul class="animateContainer" v-if="i === activeTab">
        <li
          v-for="(layoutConfig, index) in panel.types"
          :key="index"
          class="animateItem"
        >
          <div
            :class="fmtClass(layoutConfig.css)"
            :style="fmtStyle(layoutConfig)"
            @click="changeSelect(layoutConfig.css)"
          ></div>
          <div>{{ layoutConfig.name }}</div>
        </li>
      </ul>
    </div>
    <el-form
      ><el-form-item label="时间">
        <numberField
          :configData="configData"
          :config="{ props: {}, target: `animation.${index}.duration` }"
        ></numberField> </el-form-item
      ><el-form-item label="延迟">
        <numberField
          :configData="configData"
          :config="{ props: {}, target: `animation.${index}.delay` }"
        ></numberField>
      </el-form-item>
      <el-form-item label="次数">
        <numberField
          :configData="configData"
          :config="{ props: {}, target: `animation.${index}.times` }"
        ></numberField> </el-form-item
    ></el-form>
  </div>
</template>

<script>
import "../../editors";
import { get } from "@/register";
import { REG_EDITORS } from "@/const";
import animationicon from "../../../../public/animationicon.png";
import { mapMutations } from "../../../../store";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
export default {
  props: ["configData", "index"],
  components: {
    ...get(REG_EDITORS),
  },
  data() {
    return {
      activeTab: 0,
      panelConfig: [
        {
          name: "进入",
          types: [
            {
              css: "enfromtop",
              name: "从上淡入",
            },
            {
              css: "enfromright",
              name: "从右淡入",
            },
            {
              css: "enfrombotton",
              name: "从下淡入",
            },
            {
              css: "enfromleft",
              name: "从左淡入",
            },
            {
              css: "enfromtopjump",
              name: "从上弹入",
            },
            {
              css: "enfromrightjump",
              name: "从右弹入",
            },
            {
              css: "enfrombottonjump",
              name: "从下弹入",
            },
            {
              css: "enfromleftjump",
              name: "从左弹入",
            },
          ],
        },
        {
          name: "强调",
          types: [],
        },
        {
          name: "退出",
          types: [],
        },
      ],
      //   select: "enfromtop",
    };
  },
  computed: {
    select() {
      return this.configData.animation[this.index].type;
    },
  },
  created() {
    this.panelConfig.some((panel, index) => {
      let hasFound = false;
      panel.types.some((type) => {
        if (this.select === type) {
          hasFound = true;
          return true;
        }
      });
      if (hasFound) {
        this.activeTab = index;
      }
      return hasFound;
    });
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    caculateSwitchPanelClass(index) {
      return { switchPanelItem: true, select: this.activeTab === index };
    },
    changeSelect(css) {
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          [`animation.${this.index}.type`]: css,
        },
      });
      this.$event.emit("currentComponentOperate", function (vm) {
        vm.$refs.parent.idleAction(true);
      });
    },
    fmtStyle() {
      return {
        backgroundImage: `url(${animationicon})`,
      };
    },
    fmtClass(type) {
      return {
        select: type === this.select,
        [type]: true,
        animateIcon: true,
      };
    },
  },
};
</script>

<style scoped lang="less">
.switchPanelContainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.switchPanelItem{
    padding: 5px 10px;
    width: 32%;
    text-align: center;
    border-radius: 4px;
}
.select.switchPanelItem{
    background-color: gray;
}
.switchPanelItem:hover{
    background-color: gray;
}
@dy:-360px;
.caculateHover(@className,@x,@y){
    .@{className}{
        background-position: @x @y;
    }
    .select.@{className}{
        background-position: @x @y+@dy; 
    }
    .@{className}:hover{
        background-position: @x @y+@dy;
    }
}
.caculateHover(enfromtop,-180px,-120px);
.caculateHover(enfromright,-60px,-120px);
.caculateHover(enfrombotton,-120px,-120px);
.caculateHover(enfromleft, 0px,-120px);
.caculateHover(enfromtopjump,-180px,-180px);
.caculateHover(enfromrightjump,-60px,-180px);
.caculateHover(enfrombottonjump,-120px,-180px);
.caculateHover(enfromleftjump,0px,-180px);
.animateContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height:350px;
  align-content: flex-start;
}
.animateIcon {
  width: 40px;
  height: 40px;
}
.animateItem {
    font-size: 10px;
  margin: 5px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>