<template lang="html">
    <div class="preview">
        <div class="mask"></div>
        <button id="prevBtn" :disable="isDialog" @click="handlePrevPage">上一页</button>
        <button id="nextBtn" :disable="isDialog" @click="handleNextPage">下一页</button>
        <div id="pt-main" class="pt-perspective" ref="main">
            <singlePage
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
import { mapMutations, mapGetters } from "../store";
import { transition } from "../pageChange/libs/transition";

export default {
    name: "preview",
    data() {
        return {
            currentState: 0,
            nextData: null,
            isDialog: false,
        };
    },
    props: ["renderData"],
    computed: {
        ...mapGetters(["targetPage", "currentPage", "designMode"]),
        currentLayout () {
          console.log(this.findCurrentMessage(this.currentPage).layout);
          return this.findCurrentMessage(this.currentPage).layout;
        }
    },
    components: {
        singlePage,
    },
    created() {
      window.abc = this;
    },
    mounted() {
        if (!this.designMode) {
            this.beginTime = new Date().getTime();
            this.autoChange();
        }
    },
    methods: {
        ...mapMutations([
          "jumpPage",
          "jumpPageReal",
          "nextPage",
          "prePage",
          "addPathData",
          "backPrevPath"]),
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
         * @description autoChange Logic
         * @author lyuDongzhou
         * @date 2020-11-28
         */
        handleAutoChange() {
            if (this.beginTime) {
                let dt = new Date().getTime() - this.beginTime;
                if (dt > this.renderData.change.singlePagePlayTime) {
                    this.nextPage();
                    this.beginTime = null;
                }
            }
        },
        /**
         * @description reg the auto change fun
         * @author lyuDongzhou
         * @date 2020-11-28
         */
        autoChange() {
            if (this.renderData.change.loop) {
                setInterval(this.handleAutoChange.bind(this), 200);
            }
        },
        handleNextPage() {
          let getIndex = this.findCurrentIndex('pages', this.currentPage),
              pages = this.renderData.pages;
          if (getIndex+1<pages.length) {
            this.jumpPage(pages[getIndex+1].id);
          }
        },
        handlePrevPage() {
          let getIndex = this.findCurrentIndex('pages', this.currentPage),
              pages = this.renderData.pages;
          if (getIndex-1>=0) {
            this.jumpPage(pages[getIndex-1].id);
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
         * 获取currentPage在pages或者dialogs的下标
         * @return {Number Index}
         */
        findCurrentIndex (chooice,useId) {
          let getIndex;
          this.renderData[chooice].some((child, index)=> {
            if (child.id === useId) {
              getIndex = index;
              return true;
            }
          })
          return getIndex;
        },
        /**
         * 获取当前展示的内容，pages或者dialogs
         * @return {Object} layout
         * @return {String} type
         */
        findCurrentMessage (useId) {
          let layout, type;
          this.renderData.pages.some(page => {
            if (page.id === useId) {
              type =  'pages';
              layout = page;
              return true;
            }
          })
          this.renderData.dialogs.some(dialog => {
            if (dialog.id === useId) {
              type =  'dialogs';
              layout = dialog;
              return true;
            }
          })
          return {
            layout, type
          };
        }
    },
    watch: {
        /**
         * @description Watch the varible targetPage for change current page.
         */
        targetPage(next, old) {
          if (next === this.currentPage) {
              this.currentState = 2;
              return;
          }
          this.beginTime = null;
          let findCurrentMessage = this.findCurrentMessage(next);
          this.nextData  = findCurrentMessage.layout;
          this.addPathData({uuid: next, type:findCurrentMessage.type});
          this.isDialog = findCurrentMessage.type === 'dialogs';
          this.currentState = 1;
          this.$nextTick(() => {
            let oldType  = this.findCurrentMessage(old).type,
                nextType = this.findCurrentMessage(next).type,
                isPrev   = false;
            if (oldType === nextType) {
              let oldIndex = this.findCurrentIndex(oldType, old),
                  nextIndex = this.findCurrentIndex(nextType, next);
              isPrev = nextIndex < oldIndex;
            }
            this.action(isPrev).then(() => {
                this.jumpPageReal(next);
                this.$nextTick(() => {
                    this.nextIndex = null;
                    this.currentState = 2;
                    this.beginTime = new Date().getTime();
                });
            });
          });
        }
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
        background: black;
        opacity: 0.3;
    }
    .pt-perspective {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        left: 0;
        top: 0;
        .pt-page {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;
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
