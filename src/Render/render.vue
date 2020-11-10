<template>
  <ul>
    <component :is="Name" :itemConfig="renderData"></component>
  </ul>
</template>

<script>
import ImageCmp from "../Component/Image.vue";

export default {
  name: "app",
  props: ["renderData"],
  data(){
    return {
      Name:"ImageCmp",
      currentIndex:0
    }
  },
  components: {
    ImageCmp
  },
  mounted() {

  },
  methods:{
  }
};
</script>

<style>

</style>