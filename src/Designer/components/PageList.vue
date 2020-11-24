<template>
  <div class="them-dark-bg full-height">
    <!-- <p>
      <span>页面</span>
      <span>弹窗</span>
    </p> -->
    <!-- 截图依赖的dom -->
    <div class="hideDom"
      ref="hideDom"
      v-for="page in getPages"
      :key="page.id">
      <singlePage
        ref="singlePage"
        :pageData="page"></singlePage>
    </div>
    <!-- canvas add li -->
    <ul class="thumb_list">
      <li v-for="page in getPages" :key="page.id" ref="list"></li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters } from '../store';
  import singlePage from '../../Render/component/Page.vue';

  export default {
    name: "pageList",
    components: {
      singlePage
    },
    created() {
    },
    data() {
      return {
        test: false
      };
    },
    computed: {
      ...mapState([
        'currentPage',
        'pages',
        'schema'
      ]),
      ...mapGetters([
        'getPages'
      ])
    },
    mounted () {
    },
    methods: {
    },
    watch: {
      getPages (newValue) {
        this.$nextTick(() => {
          setTimeout(() => {
            newValue.forEach((page, index) => {
              // let hideDomWidth =  this.$refs.hideDom[index].style.offsetWidth;
              // let hideDomHeight =  this.$refs.hideDom[index].style.offsetHeight,
              //     offset = 200;
              //
              // let scaleX =
              // this.$refs.hideDom[index].style.transform = 'scale(0.5, 0.5)';
              // setTimeout(() => {
                let currentPage = this.$refs.singlePage[index];
                currentPage.screenShots({
                  width: this.$refs.hideDom[index].offsetWidth,
                  height: this.$refs.hideDom[index].offsetHeight,
                }).then((canvas) => {
                  this.$refs.list[index].appendChild(canvas);
                  this.$refs.hideDom[index].style.display = 'none';
                })
            })
          }, 5000)
        })
      }
    }
  }
</script>

<style media="screen">
  canvas {
    transform: scale(0.16);
    transform-origin: 0 0;
  }
</style>
<style lang="less" scoped>
  .hideDom {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 1000px;
    left: 0;
  }
  .thumb_list {
  }
</style>
