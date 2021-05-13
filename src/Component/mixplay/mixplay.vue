<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig" style="display: block">
    <div
      v-for="(cmp, index) in cmpConfig.props.components"
      v-bind:key="cmp.id"
      :style="{
        width: '100%;',
        height: '100%',
        display:
          current % cmpConfig.props.components.length === index
            ? 'block'
            : 'none',
      }"
    >
      <!-- <div style="width: 100%; height: 100%" v-if="(current%cmpConfig.props.components.length) === index"> -->
      <img
        :src="handleUrl(cmp.sourcePaht)"
        style="width: 100%; height: 100%"
        v-if="cmp.resType === 1"
      />
      <video
        autoplay
        :src="handleUrl(cmp.sourcePaht)"
        style="width: 100%; height: 100%"
        v-if="cmp.resType === 2"
      />
      <!-- </div> -->
    </div>
  </baseCmp>
</template>
<script>
import { mapGetters } from "../../Render/store/";
import baseCmp from "../Base";
export default {
  name: "mixplayCmp",
  components: {
    baseCmp,
  },
  data() {
    return {
      current: 0,
    };
  },
  mounted() {
    if (!this.designMode) {
      this.interval = setInterval(() => {
        this.current++;
      }, this.cmpConfig.props.changeTime * 1000);
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapGetters(["handleUrl","designMode"]),
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
