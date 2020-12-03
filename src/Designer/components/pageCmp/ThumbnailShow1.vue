<template lang="html">
    <div class="thumbnailShow">
        <ul>
            <li
                v-for="(page,index) in pages"
                :class="page.id===currentPage.id?'list_active':''"
                :key="page.id"
                @click="switchCurrentPage(page)"
            >
                <p class="list_index">{{index+1}}</p>
                <p class="list_thumbnail">
                    <snapShotDisplay :id="page.id"></snapShotDisplay>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "../../store";
import snapShotDisplay from "../snapShotDisplay";
import manager from "../../manager/snapShot";
export default {
  name: "ThumbnailShow",
  components: {
    snapShotDisplay,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["pages", "currentPage"]),
  },
  created() {},
  mounted() {
  },
  updated() {},
  methods: {
    ...mapMutations(["selectPage"]),
    /**
     * 点击缩略图切换页面
     * @param {Object} page
     */
    switchCurrentPage(page) {
      this.selectPage(page.id, 'page', 'page');
    },
  },
  watch: {
    pages(newValue) {
      newValue.forEach((ele) => {
        manager.addTask(ele.id);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.thumbnailShow {
  width: 100%;
  height: 100%;
  > ul {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 157px;
    li {
      width: 100%;
      height: 210px;
      display: flex;
      p {
        margin-top: 21px;
      }
      .list_index {
        width: 30px;
        height: 30px;
        background: #ffffff;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin: 64px 38px 95px 31px;
      }
      .list_thumbnail {
        width: 124px;
        height: 157px;
      }
    }
    li:hover {
      cursor: pointer;
      background: #727272;
    }
    .list_active {
      cursor: pointer;
      background: #727272;
    }
  }
}
</style>
