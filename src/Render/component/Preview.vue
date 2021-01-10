<template lang="html">
  <div class="preview" :style="!designMode ? { overflow: 'hidden' } : {}">
    <div class="mask"></div>
    <button id="prevBtn" v-if="!designMode&&!isProduction" @click="handlePrevPage">
      上一页
    </button>
    <button id="nextBtn" v-if="!designMode&&!isProduction" @click="handleNextPage">
      下一页
    </button>
    <div id="pt-main" class="pt-perspective" ref="main">
          <singlePage
              v-if="currentLayout"
              ref="displayPage"
              class="pt-page pt-page-current"
              :pageData="currentLayout"
              :pageState="currentState"
          ></singlePage>
          <singlePage
              v-if="nextData !== null"
              ref="nextPage"
              class="pt-page"
              :pageData="nextData"
          ></singlePage>
      </div>
  </div>
</template>

<script>
import singlePage from "./Page";
import { mapState, mapMutations, mapGetters } from "../store";
import { transition } from "../pageChange/libs/transition";

export default {
  name: "preview",
  data() {
    return {
      currentState: 0,
      nextData: null,
      isDialog: false,
      clickSwitchPage: null,
    };
  },
  props: ["renderData"],
  computed: {
    ...mapState(["windowStorage", "singlePagePreview"]),
    ...mapGetters(["targetPage", "currentPage", "designMode"]),
    currentLayout() {
      return this.findCurrentMessage(this.currentPage).layout;
    },
    isProduction(){
      return !!window.renderData;
    }
  },
  components: {
    singlePage,
  },
  mounted() {
    if (!this.designMode) {
      this.currentState = 2;
      this.beginTime = new Date().getTime();
      if (!this.singlePagePreview) {
        this.automaticCycle();
      }
    }
  },
  methods: {
    ...mapMutations([
      "jumpPage",
      "jumpPageReal",
      "backPrevDialog",
      "setCurrentPage",
    ]),
    /**
     * @description Change page action
     * @author lyuDongzhou
     * @date 2020-11-28
     * @param {*} isPrev define change type
     */
    action(isPrev) {
      return new Promise((resolve, reject) => {
        if (this.nextData !== null) {
          let $main = $(this.$refs["main"]);
          let $pages = $($main).children("ul.pt-page");
          this.translate = new transition({
            $main,
            $pages,
            loop: false,
            callback: () => {
              resolve();
            },
          });
          console.log();
          this.translate.nextPage(
            !isPrev
              ? this.renderData.change.type
              : this.renderData.change.type + 1
          );
        } else {
          reject();
        }
      });
    },

    /**
     * 自动轮播page
     * page timer
     */
    automaticCycle() {
      if (this.renderData.change.loop) {
        let singlePagePlayTime = this.renderData.change.singlePagePlayTime;
        console.log(singlePagePlayTime, "qqqqqq");
        this._timer = setInterval(() => {
          if (this.beginTime) {
            let dt = new Date().getTime() - this.beginTime;
            if (dt > singlePagePlayTime) {
              this.handleNextPage();
              this.beginTime = null;
            }
          }
        }, singlePagePlayTime * 1000);
      }
    },
    handleNextPage() {
      let getIndex = this.findCurrentIndex("pages", this.currentPage),
        pages = this.renderData.pages;
      if (getIndex + 1 < pages.length) {
        this.jumpPage(pages[getIndex + 1].id);
      } else if (this.renderData.change.loop) {
        // loop
        this.jumpPage(pages[0].id);
        this.clickSwitchPage = "next";
      }
    },
    handlePrevPage() {
      let getIndex = this.findCurrentIndex("pages", this.currentPage),
        pages = this.renderData.pages;
      if (getIndex - 1 >= 0) {
        this.jumpPage(pages[getIndex - 1].id);
      } else if (this.renderData.change.loop) {
        // loop
        this.jumpPage(pages[pages.length - 1].id);
        this.clickSwitchPage = "prev";
      }
    },
    getCmp(id) {
      let page = this.$refs["displayPage"];
      if (page) {
        return page.getCmp(id);
      } else {
        return;
      }
    },
    /**
     * 获取dialogId在windowStroage的下标
     * dialog->dialog使用
     */
    findStorageIndex(dialogId) {
      return this.windowStorage.findIndex((item) => item.toId === dialogId);
    },
    findStorageMessage(next, old) {
      return this.windowStorage.findIndex(
        (item) => item.toId === next && item.fromId === old
      );
    },
    /**
     * 获取currentPage在pages或者dialogs的下标
     * @return {Number Index}
     */
    findCurrentIndex(chooice, useId) {
      let getIndex;
      this.renderData[chooice].some((child, index) => {
        if (child.id === useId) {
          getIndex = index;
          return true;
        }
      });
      return getIndex;
    },
    /**
     * 获取当前展示的内容，pages或者dialogs
     * @return {Object} layout
     * @return {String} type
     */
    findCurrentMessage(useId) {
      let layout, type;
      this.renderData.pages.some((page) => {
        if (page.id === useId) {
          type = "pages";
          layout = page;
          return true;
        }
      });
      this.renderData.dialogs.some((dialog) => {
        if (dialog.id === useId) {
          type = "dialogs";
          layout = dialog;
          return true;
        }
      });
      return {
        layout,
        type,
      };
    },
    /**
     * 切页的方向
     * page->page || page->dialog || dialog->dialog || dialog->page
     */
    judgeDirection(next, old) {
      let oldType = this.findCurrentMessage(old).type,
        nextType = this.findCurrentMessage(next).type,
        isPrev = false;
      if (oldType === nextType) {
        if (nextType === "pages") {
          // TODO: page->page -> only click prevBtn isPrev=true
          if (this.clickSwitchPage) {
            isPrev = this.clickSwitchPage === "prev" ? true : false;
          }
        } else {
          // dialog->dialog
          if (
            this.windowStorage.length > 0 &&
            this.windowStorage[this.windowStorage.length - 1].toId === next &&
            this.windowStorage[this.windowStorage.length - 1].fromId !== old
          ) {
            isPrev = true;
          }
        }
      } else {
        if (nextType === "pages") {
          // dialog->page
          if (this.windowStorage.length === 0) {
            // back the form page
            isPrev = true;
          } else {
            // go the to page
            isPrev = false;
          }
        } else {
          // page->dialog must be next
          isPrev = false;
        }
      }
      return isPrev;
    },
  },
  watch: {
    /**
     * @description Watch the varible targetPage for change current page.
     */
    targetPage(next, old) {
      console.log("targetChange");
      clearInterval(this._timer);
      if (next === this.currentPage) {
        this.currentState = 2;
        return;
      }
      this.beginTime = null;
      let findCurrentMessage = this.findCurrentMessage(next);
      this.nextData = findCurrentMessage.layout;
      this.isDialog = findCurrentMessage.type === "dialogs";
      this.currentState = 1;
      this.$nextTick(() => {
        let isPrev = this.judgeDirection(next, old);
        this.action(isPrev).then(() => {
          this.clickSwitchPage = null;
          this.jumpPageReal(next);
          this.$nextTick(() => {
            this.nextIndex = null;
            this.currentState = 2;
            this.beginTime = new Date().getTime();
            let nextType = this.findCurrentMessage(next).type;
            if (nextType === "pages") {
              // auto change page
              this.automaticCycle();
            } else {
              // auto back prev dialog
              let msg = this.windowStorage;
              if (msg.length > 0) {
                this._timer = setInterval(() => {
                  this.jumpPage(msg[msg.length - 1].fromId);
                  this.backPrevDialog();
                }, msg[msg.length - 1].backTime);
              }
            }
          });
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  width: 100%;
  height: 100%;
  position: absolute;
  .mask {
    width: 100%;
    height: 100%;
    /*background: black;*/
    opacity: 0.3;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
  #nextBtn {
    margin-top: 40px;
  }
  .pt-perspective {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .pt-page {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: none;
      z-index: 0;
    }
    .pt-page-current {
      z-index: 1;
      display: inline-block;
    }
  }
}
</style>
