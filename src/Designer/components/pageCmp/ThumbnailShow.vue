<template lang="html">
  <div class="thumbnailShow">
    thumbnailShow
    <!-- <div class="hideDom"
      ref="hideDom"
      v-for="page in getPages"
      :key="page.id">
      <singlePage
        ref="singlePage"
        :pageData="page"></singlePage>
    </div> -->
    <!-- canvas add li -->
    <ul class="thumb_list">
      <!-- <li v-for="page in getPages" :key="page.id" ref="list"></li> -->
    </ul>
  </div>
</template>

<script>
// import { mapGetters } from '../../store';
// import singlePage from '../../../Render/component/Page.vue';

export default {
  name: 'ThumbnailShow',
  components: {
    // singlePage
  },
  computed: {
    // ...mapGetters([
    //   'getPages'
    // ])
  },
  updated () {
    console.log(this.getPages);
  },
  watch: {
    // getPages (newValue) {
    //   console.log('watch');
    //   this.$nextTick(() => {
    //     newValue.forEach((page, index) => {
    //       let hideDomWidth  = this.$refs.hideDom[index].offsetWidth,
    //           hideDomHeight = this.$refs.hideDom[index].offsetHeight,
    //           offsetWidth   = 124,
    //           offsetHeight  = 209,
    //           scaleX = offsetWidth/hideDomWidth,
    //           scaleY = offsetHeight/hideDomHeight;
    //       let currentPage = this.$refs.singlePage[index];
    //       currentPage.screenShots({
    //         width: this.$refs.hideDom[index].offsetWidth,
    //         height: this.$refs.hideDom[index].offsetHeight,
    //       }).then((canvas) => {
    //         canvas.style.transform = `scale(${scaleX}, ${scaleY})`;
    //         canvas.style['transform-origin'] = '0 0';
    //         canvas.style['margin-left'] = '100px';
    //         this.$refs.list[index].appendChild(canvas);
    //         this.$refs.hideDom[index].style.display = 'none';
    //       })
    //     })
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
  .thumbnailShow {
    width: 100%;
    height: 100%;

    .hideDom {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 1000px;
      left: 0;
    }
    .thumb_list {
      width: 124px;
      height: 157px;
      text-align: center;
      line-height: 157px;
    }
  }
</style>
