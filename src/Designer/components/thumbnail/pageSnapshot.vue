<template>
  <!-- thumbnail from this page -->
  <div v-if="snapping" style="position: absolute; top: 5000px">
    <div :style="containerStyle">
      <singlePage ref="page" :pageData="snapData"></singlePage>
    </div>
  </div>
</template>

<script>
import singlePage from "../../../Render/component/Page.vue";
import { mapGetters, mapState } from "../../store";
import { setSnapShotInstance } from "../../manager/snapShot";
export default {
  name: "snapShot",
  data() {
    return {
      snapping: false,
      snapData: null,
      width: 0,
      height: 0,
    };
  },
  components: {
    singlePage,
  },
  props: [],
  computed: {
    ...mapState(["vmSchema"]),
    ...mapGetters(["pages", "dialog"]),
    containerStyle() {
      return {
        position: "absolute",
        width: this.vmSchema ? this.vmSchema.container.width + "px" : 0,
        height: this.vmSchema ? this.vmSchema.container.height + "px" : 0,
      };
    },
  },
  mounted() {
    setSnapShotInstance(this);
  },
  methods: {
    /**
     * @description: get page schema by id
     * @return {page schema}
     */
    getPageData(id) {
      let data = this.pages.find((ele) => ele.id === id);
      if (!data) {
        data = this.dialog.find((ele) => ele.id === id);
      }
      return data;
    },
    /**
     * @description: render snap shot to canvas
     * @return {*}
     */
    render(id) {
      return new Promise((resolve) => {
        this.snapping = true;
        this.snapData = this.getPageData(id);
        this.$nextTick(() => {
          let currentPage = this.$refs.page;
          currentPage
            .screenShots({
              width: this.vmSchema.container.width,
              height: this.vmSchema.container.height,
            })
            .then((canvas) => {
              let data = null;
              try {
                data = canvas.toDataURL();
              } catch (e) {
                console.log(e);
              }
              this.snapping = false;
              this.snapData = null;
              resolve(data);
            });
        });
      });
    },
  },
};
</script>

<style>
</style>
