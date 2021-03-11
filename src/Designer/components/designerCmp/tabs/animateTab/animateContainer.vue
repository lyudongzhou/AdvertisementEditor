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
        <div style="display: flex; flex-wrap: wrap;width:100%">
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
        </div>
      </ul>
    </div>
    <el-form size="mini" class="aniform"
      ><el-form-item label="时间（秒）" style="width:100%">
        <numberField
          style="width: 100%"
          :configData="configData"
          :config="{ props: {}, target: `animation.${index}.duration` }"
        ></numberField> </el-form-item
      ><el-form-item label="延迟（秒）">
        <numberField
          style="width: 100%"
          :configData="configData"
          :config="{ props: {}, target: `animation.${index}.delay` }"
        ></numberField>
      </el-form-item>
      <el-form-item label="次数">
        <numberField
          style="width: 100%"
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
            {
              css: "encenterbounds",
              name: "中心弹入",
            },
            {
              css: "encenterscale",
              name: "中心放大",
            },
            {
              css: "enrollin",
              name: "翻滚进入",
            },
            {
              css: "enlightspeedin",
              name: "光速进入",
            },
            {
              css: "enmagic",
              name: "魔幻进入",
            },
            {
              css: "ensmallbound",
              name: "缩小弹入",
            },
            {
              css: "enroutate",
              name: "旋转进入",
            },
            {
              css: "enfade",
              name: "淡入",
            },
          ],
        },
        {
          name: "强调",
          types: [
            {
              css: "stroll",
              name: "2D旋转",
            },
            {
              css: "stshake",
              name: "抖动",
            },
            {
              css: "stleftrightfloat",
              name: "左右浮动",
            },
            {
              css: "stupdownfloat",
              name: "上下浮动",
            },
            {
              css: "stshine",
              name: "闪烁",
            },
            {
              css: "stleftrightbound",
              name: "左右摆动",
            },
            {
              css: "stq",
              name: "Q弹晃动",
            },
          ],
        },
        {
          name: "退出",
          types: [
            {
              css: "qttotop",
              name: "向上淡出",
            },
            {
              css: "qttoright",
              name: "向右淡出",
            },
            {
              css: "qttobotton",
              name: "向下淡出",
            },
            {
              css: "qttoleft",
              name: "向左淡出",
            },
            {
              css: "qtfadeout",
              name: "淡出",
            },
          ],
        },
      ],
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
        vm.$children[0].idleAction(true)
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
@deep: ~">>>";
@{deep} .aniform{
  padding: 16px 26px;
  .el-form-item__label{
    text-align: left;
  }
}
.switchPanelContainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.switchPanelItem{
  padding: 5px 10px;
  width: 32%;
  text-align: center;
  width: 80px;
  height: 30px;
  color:white;
  border-radius: 5px;

}
.select.switchPanelItem{
  background: #117EDD;
}
.switchPanelItem:hover{
  background: #117EDD;
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

.caculateHover(encenterbounds,-120px,0px);
.caculateHover(encenterscale,0px,-60px);
.caculateHover(enrollin,-240px,-120px);
.caculateHover(enlightspeedin,0px,-240px);

.caculateHover(enmagic,-480px,-120px);
.caculateHover(ensmallbound,-180px,0px);
.caculateHover(enroutate,-180px,-60px);
.caculateHover(enfade,-60px,0px);

.caculateHover(stroll,-180px,-240px);
.caculateHover(stshake,-540px,-180px);
.caculateHover(stleftrightfloat,-360px,-120px);
.caculateHover(stupdownfloat,-540px,-180px);

.caculateHover(stshine,-420px,-120px);
.caculateHover(stleftrightbound,-300px,-240px);
.caculateHover(stq,-240px,-180px);

.caculateHover(qttotop,-120px,-120px);
.caculateHover(qttoright,0px,-120px);
.caculateHover(qttobotton,-180px,-120px);
.caculateHover(qttoleft,-60px,-120px);
.caculateHover(qtfadeout,-60px,0px);

.animateContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // height:350px;
  align-content: flex-start;
}
.animateIcon {
  width: 40px;
  height: 40px;
}
.animateItem {
  color: white;
  width:25%;
  font-size: 10px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>