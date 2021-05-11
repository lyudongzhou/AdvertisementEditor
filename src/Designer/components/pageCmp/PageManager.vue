<template lang="html">
  <div class="pageManager">
    <div class="thumbnail_warp">
      <ThumbnailShow></ThumbnailShow>
    </div>
    <p class="add_page el-icon-plus" @click="addPage"></p>
  </div>
</template>

<script>
import ThumbnailShow from "./ThumbnailShow.vue";
import schemaMixin from "../../mixin/schemaMixin";
import manager from "../../manager/snapShot";
import { mapState } from "../../store";
export default {
  name: "PageManager",
  mixins: [schemaMixin],
  components: {
    ThumbnailShow,
  },
  data() {
    return {};
  },
  methods: {
    addPage() {
      manager.addTask(this.currentPageId, false, true);
      this.$$addPage("page");
    },
  },
  computed: {
    ...mapState(["currentPageId"]),
  },
};
</script>

<style lang="less" scoped>
.pageManager {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .thumbnail_warp {
    overflow: auto;
    flex: 1;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  p {
    width: 100%;
    height: 50px;
    background: #9a9898;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
