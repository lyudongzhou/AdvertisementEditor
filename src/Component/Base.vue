<template>
  <li
    class="moveItem"
    :style="publicList"
    @click.exact="dispatchEvent('click', arguments[0])"
    @click.right.exact="dispatchEvent('rightClick', $event)"
    @click.ctrl.exact="dispatchEvent('ctrlClick', $event)"
  >
    <slot></slot>
  </li>
</template>
<script>
import pipe from "../Render/pipe";
import { mapActions } from "../Render/store";
import animationDispatcher from "./animations/";
import "./events";
import { get } from "@/register";
import { REG_EVENTS } from "@/const";
const eventMap = get(REG_EVENTS);
import Matrix from "./math/Matrix";
// import {PerspectiveCamera} from "@/math/Camera";
// const ma = new Matrix4();
// console.log(ma);
export default {
  name: "baseCmp",
  props: ["cmpConfig", "pageState"],
  data() {
    return {};
  },
  computed: {
    layoutConfig() {
      return this.cmpConfig.layoutConfig;
    },
    publicList() {
      const style = {
        opacity: 1,
      };
      let ma = new Matrix();
      let config = this.layoutConfig;
      const {
        positionX = 0,
        positionY = 0,
        pivotX = 0,
        pivotY = 0,
        scaleX = 1,
        scaleY = 1,
        aniRotation = 0,
        skewX = 0,
        skewY = 0,
      } = this.layoutConfig;
      ma.setTransform(
        positionX,
        positionY,
        pivotX,
        pivotY,
        scaleX,
        scaleY,
        aniRotation,
        skewX,
        skewY
      );
      Object.keys(config).forEach((key) => {
        switch (key) {
          case "rotation":
            style["transform"] = `rotate(${
              config.rotation
            }deg) matrix(${ma.toCssArray().join(",")})`;
            break;
          case "opacity":
            style[key] *= config[key];
            break;
          case "alpha":
            style["opacity"] *= config[key];
            break;
          case "zIndex":
            style["z-index"] = config[key];
            break;
          case "border-color":
            style["border-color"] = config[key];
            break;
          case "border-style":
            style["border-style"] = config[key];
            break;
          default:
            style[key] = `${config[key]}px`;
        }
      });
      return style;
    },
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions([]),
    dispatchEvent(type, e) {
      if (!this.$store.state.currentRenderState.designMode) {
        this.cmpConfig.events.forEach((ele) => {
          if (eventMap[ele.type] && eventMap[ele.type].eventKey === type) {
            eventMap[ele.type].method.call(this, ele.value, e, this);
          }
        });
      } else if (type === "click") {
        pipe.emit("click", this, this.cmpConfig.id);
      } else if (type === 'rightClick') {
        pipe.emit("rightClick", this, this.cmpConfig.id, e);
      } else if (type === 'ctrlClick') {
        pipe.emit("ctrlClick", this, this.cmpConfig.id, e);
      }
    },
    idleAction(isForce) {
      if (!this.$store.state.currentRenderState.designMode || isForce) {
        animationDispatcher(this.cmpConfig, this.layoutConfig, this);
      }
    },
  },
};
</script>
<style scoped>
.moveItem {
  display: flex;
  position: absolute;
  border-style: solid;
  overflow: hidden;
}
</style>
