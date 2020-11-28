<template>
    <li
        class="moveItem"
        :style="publicList"
        @click="dispatchEvent('click', arguments[0])"
    >
        <div :style="animationStyleComputed">
            <slot></slot>
        </div>
    </li>
</template>
<script>
import eventMap from "./events/";
import pipe from "../Render/pipe";
import { mapMutations, mapActions } from "../Render/store";
import animationDispatcher from "./animation/";
export default {
    name: "baseCmp",
    props: ["cmpConfig", "pageState"],
    data() {
        return {
            animationStyle: {
                left: 0,
                top: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
            },
            testId: ['1', 'dialog1', 'dialogs2', '2']
        };
    },
    computed: {
        layoutConfig(){
            return this.cmpConfig.layoutConfig;
        },
        publicList() {
            const style = {};
            Object.keys(this.layoutConfig).forEach((key) => {
                switch (key) {
                    case "rotation":
                        style[
                            "transform"
                        ] = `rotate(${this.layoutConfig.rotation}deg)`;
                        break;
                    case "opacity":
                        style[key] = this.layoutConfig[key];
                        break;
                    case "z-index":
                        style[key] = this.layoutConfig[key];
                        break;
                    default:
                        style[key] = `${this.layoutConfig[key]}px`;
                }
            });
            return style;
        },
        animationStyleComputed() {
            const style = {
                position: "absolute",
                width: "100%",
                height: "100%",
            };
            let o = this.animationStyle;
            Object.keys(o).forEach((key) => {
                switch (key) {
                    case "rotation":
                        style["transform"] = `rotate(${o.rotation}deg)`;
                        break;
                    case "opacity":
                        style[key] = o[key];
                        break;
                    default:
                        style[key] = `${o[key]}px`;
                }
            });
            return style;
        },
    },
    created() {},
    methods: {
      ...mapMutations(['jumpPage']),
      ...mapActions(["nextPage"]),
      dispatchEvent(type, e) {
          if (!this.$store.state.currentRenderState.designMode) {
              this.cmpConfig.events.forEach((ele) => {
                  if (
                      eventMap[ele.type] &&
                      eventMap[ele.type].eventKey === type
                  ) {
                      eventMap[ele.type].method.call(
                          this,
                          ele.value,
                          e,
                          this
                      );
                  }
              });
          } else if (type === "click") {
              pipe.emit("click", this, this.cmpConfig.id);

              /**
               * 模拟dialog Jam
               */
              this.jumpPage(this.testId[3]);
          }
      },
      idleAction(isForce) {
          if (!this.$store.state.currentRenderState.designMode || isForce) {
              animationDispatcher(this.cmpConfig, this.animationStyle);
          }
      },
    },
    mounted() {},
};
</script>
<style scoped>
.moveItem {
    display: flex;
    position: absolute;
}
</style>
