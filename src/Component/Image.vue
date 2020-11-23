<template>
  <baseCmp ref="parent" :cmpConfig='cmpConfig'>
    <img :src="handleUrl(cmpConfig.props.bgUrl)" style="width:100%;height:100%"/>
  </baseCmp>
</template>
<script>
import baseCmp from "./Base.vue";
import {mapGetters} from '../Render/store';
export default {
  name: "ImageCmp",
  components: {
    baseCmp
  },
  mounted(){
    this.parent = this.$refs["parent"];
  },
  computed: {
    ...mapGetters(['handleUrl'])
  },
  props:["cmpConfig"]
};
</script>