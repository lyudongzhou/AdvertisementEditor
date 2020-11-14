<template>
  <singlePage
    :style="{'position':'absolute',
          'background-color':renderData.container.backGround,
          'width':renderData.container.width+'em',
          'height':renderData.container.height+'em',
          'fontSize':Math.min(displayWidth / this.renderData.container.width,displayHeight / this.renderData.container.width)+'px'
          }"
    :pageData="renderData.pages[currentIndex]"
    :pageIndex="currentIndex"
  ></singlePage>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
import singlePage from "./component/Page";
export default {
  name: "app",
  props: ["renderData","displayWidth","displayHeight"],
  data() {
    return {
    };
  },
  computed: {
    currentIndex(){
      return this.$store.state.currentRenderState.currentPage;
    },
    pageCount(){
      return this.renderData.pages.length; 
    }
  },
  watched:{
    pageCount(data){
      this.$store.commit("pageCountChange",data);
    }
  },
  created(){
    this.$store.commit("pageCountChange",this.pageCount);
  },
  components: {
    singlePage
    // ImageCmp
  },
  mounted() {},
  methods: {
  }
};
</script>

<style>
</style>