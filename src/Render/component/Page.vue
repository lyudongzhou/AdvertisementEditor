<!--
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-11-30 05:29:17
 * @Description: A template for render single page or single dialog
-->
<template>
  <ul :style="fmtStyle()" ref="page" :key="pageData.id">
    <div class="nextPage" v-if="pageType">
      <img src="../../Designer/public/prewPage.png" />
    </div>
    <component
      v-for="cmp in pageData.components"
      v-bind:key="cmp.id"
      :is="cmp.type"
      :cmpConfig="cmp"
      :ref="cmp.id"
    />
  </ul>
</template>
<script>
import html2canvas from "html2canvas";
import "../../Component";
import { get } from "@/register";
import { REG_COMPONENTS } from "@/const";
import { mapGetters } from "../store";
//props属性：
//pageState
//0 准备进入 1 进入中 2 已进入 3 弹出中*
export default {
  name: "singlePage",
  props: ["pageData", "pageState", "pageType"],
  components: get(REG_COMPONENTS),
  data() {
    return {
      isSnapShot: false,
    };
  },
  mounted() {},
  created() {},
  computed: {
    ...mapGetters(["handleUrl", "designMode"]),
    test() {
      return this.pageData.components;
    },
  },
  watch: {
    pageState(data) {
      if (data === 2 && this.pageData) {
        this.pageData.components.forEach((ele) => {
          this.$refs[ele.id] && this.$refs[ele.id][0].$children[0].idleAction();
        });
      }
    },
  },
  methods: {
    getCmp(id) {
      let cmp = this.$refs[id];
      if (cmp) {
        return cmp[0];
      } else {
        return null;
      }
    },
    screenShots({ width, height } = {}) {
      this.isSnapShot = true;
      return new Promise((resolve) => {
        this.$nextTick(() => {
          html2canvas(this.$refs.page, {
            width,
            height,
            allowTaint: true,
            useCORS: true
          }).then((canvas) => {
            resolve(canvas);
          });
        });
      });
    },
    fmtStyle() {
      if (this.isSnapShot || !this.designMode) {
        if (this.pageData.container.backGround.type === "image") {
          return {
            "background-image": `url(${this.handleUrl(
              this.pageData.container.backGround.value.url
            )})`,
            width: "100%",
            height: "100%",
            "background-size": "100% 100%",
          };
        } else {
          return {
            "background-color": this.pageData.container.backGround.value,
            width: "100%",
            height: "100%",
          };
        }
      } else {
        return {
          "background-color": "transparent",
          width: "100%",
          height: "100%",
        };
      }
    },
  },
};
</script>

<style lang="less">
ul {
  position: relative;

  .nextPage {
    background: none;
    position: absolute;
    top: 50%;
    right: 15px;
    z-index: 999;
    transform: translateY(-50%);
    animation-name: moveImg;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;

    img {
      width: 35px;
    }
  }
}

// 翻页效果动画
@keyframes moveImg {
  0% {
    right: 15px;
    opacity: 0;
  }
  40% {
    right: 24px;
  }
  50% {
    opacity: 1;
  }
  80% {
    right: 15px;
  }
  100% {
    opacity: 0;
  }
}
</style>