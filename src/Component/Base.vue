<template>
  <li class="moveItem" @click="dispatchEvent('click',arguments[0])">
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
  methods: {
    dispatchEvent(type, e) {
      if (!this.$store.state.currentRenderState.designMode) {
        this.cmpConfig.events.forEach(ele => {
          if (eventMap[ele.type] && eventMap[ele.type].eventKey === type) {
            eventMap[ele.type].method.call(this, ele.value, e, this);
          }
        });
      }else if(type==="click"){
          pipe.emit("click",this);
      }
    }
  }
};
</script>
<style scoped>
.moveItem {
  display: block;
  position: absolute;
}
</style>