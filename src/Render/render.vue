<template>
  <singlePage :pageData="renderData.pages[currentIndex]" :pageIndex="currentIndex"></singlePage>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
import singlePage from "./component/Page";
export default {
  name: "app",
  props: ["renderData"],
  data(){
    return {
      currentIndex:0
    }
  },
  components: {
    singlePage
    // ImageCmp
  },
  mounted() {
    // this.currentIndex = 0;
    console.log(this.renderData);
    window.page = this;
  },
  methods:{
    nextPage(){
      if(this.currentIndex<this.renderData.pages.length-1){
        this.currentIndex++;
        return true;
      }
      return false;
    },
    prePage(){
      if(this.currentIndex>0){
        this.currentIndex--;
        return true;
      }
      return false;
    }
  }
};
</script>

<style>

</style>