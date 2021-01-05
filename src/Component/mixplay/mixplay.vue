<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <div v-for="(cmp, index) in cmpConfig.props.components" v-bind:key="cmp.id" style="width:100%;height:100%">
      <div style="width: 100%; height: 100%" v-show="(current%cmpConfig.props.components.length) === index">
        <img
          :src="handleUrl(cmp.resUrl)"
          style="width: 100%; height: 100%"
          v-if="cmp.resType === 1"
        />
        <iframe
          :src="handleUrl(cmp.resUrl)"
          style="width: 100%; height: 100%"
          v-if="cmp.resType === 4"
        />
        <video
          autoplay
          :src="handleUrl(cmp.resUrl)"
          style="width: 100%; height: 100%"
          v-if="cmp.resType === 3"
        />
      </div>
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
    this.interval = setInterval(()=>{
      this.current++;
    },3000);
  },
  computed: {
    ...mapGetters(["handleUrl"]),
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
