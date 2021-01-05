<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <div v-for="(cmp, index) in cmpConfig.props.components" v-bind:key="cmp.id">
      <component
        v-if="index === current"
        :is="cmp.type"
        :cmpConfig="cmp"
        :ref="cmp.id"
      />
    </div>
  </baseCmp>
</template>
<script>
import baseCmp from "../Base.vue";
import ImageCmp from "../image/image";
import documentCmp from "../document/document";
import { mapGetters } from "../../Render/store/";
export default {
  name: "mixplayCmp",
  components: {
    baseCmp,
    ImageCmp,
    documentCmp,
  },
  data() {
    return {
      current: 0,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["handleUrl"]),
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
