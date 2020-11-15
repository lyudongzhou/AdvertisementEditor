<template>
  <singlePage
    :style="{'position':'absolute',
          'width':renderData.container.width+'px',
          'height':renderData.container.height+'px'
          }"
    :pageData="renderData.pages[currentIndex]"
    :pageIndex="currentIndex"
  ></singlePage>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
import singlePage from "./component/Page";
import pipe from "./pipe";
export default {
  name: "app",
  props: ["renderData","currentPage","designMode"],
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
  watch:{
    pageCount(data){
      this.$store.commit("pageCountChange",data);
    },
    currentPage(data){
      this.$store.commit("jumpPage",data);
    },
    designMode(data){
      this.$store.commit("setDesignMode",data);
    }
  },
  created(){
    this.$store.commit("pageCountChange",this.pageCount);
    this.$store.commit("setDesignMode",this.designMode);
    pipe.on("click",(dom)=>{
      this.$emit("click",dom);
    });
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