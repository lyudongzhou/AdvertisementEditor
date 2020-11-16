<template>
  <li class="moveItem" :style="publicList" @click="dispatchEvent('click',arguments[0])">
    <slot></slot>
  </li>
</template>
<script>
import eventMap from "./eventmap";
import pipe from "../Render/pipe";
console.log(eventMap);
export default {
  name: "baseCmp",
  props: ["cmpConfig"],
  computed: {
    publicList () {
      return {
        'width': `${this.cmpConfig.layoutConfig.width}rem`,
        'height': `${this.cmpConfig.layoutConfig.height}rem`,
        'left': `${this.cmpConfig.layoutConfig.left}rem`,
        'top': `${this.cmpConfig.layoutConfig.top}rem`,
        'z-index': this.cmpConfig.layoutConfig.zIndex,
        'opacity': this.cmpConfig.layoutConfig.opacity,
        "transform": `rotate(${this.cmpConfig.layoutConfig.rotation}deg)`
      }
    }
  },
  methods: {
    dispatchEvent(type, e) {
      if (!this.$store.state.currentRenderState.designMode) {
        this.cmpConfig.events.forEach(ele => {
          if (eventMap[ele.type] && eventMap[ele.type].eventKey === type) {
            eventMap[ele.type].method.call(this, ele.value, e, this);
          }
        });
      }else if(type==="click"){
          pipe.emit("click",this, this.cmpConfig.id);
      }
    }
  }
};
</script>
<style scoped>
.moveItem {
  display: flex;
  position: absolute;
  overflow: hidden;
  img {
    width: auto;
    height: auto;
  }
}
</style>
