<template lang="html">
    <div class="preview">
        <div class="mask"></div>
        <button id="prevBtn" @click="handlePrevPage">上一页</button>
        <button id="nextBtn" @click="handleNextPage">下一页</button>
        <div id="pt-main" class="pt-perspective" ref="main">
            <singlePage
                ref="displayPage"
                class="pt-page pt-page-current"
                :pageData="renderData.pages[currentPage]"
                :pageState="currentState"
            ></singlePage>
            <singlePage
                v-if="nextIndex !== null"
                ref="nextPage"
                class="pt-page"
                :pageData="renderData.pages[nextIndex]"
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
            nextIndex: null,
        };
    },
    props: ["renderData"],
    computed: {
        ...mapGetters(["targetPage", "currentPage", "designMode"]),
    },
    components: {
        singlePage,
    },
    created() {
        window.abc = this;
        console.log("created");
    },
    mounted() {
        if (!this.designMode) {
            this.beginTime = new Date().getTime();
            this.autoChange();
        }
    },
    methods: {
        ...mapMutations(["jumpPageReal", "nextPage", "prePage"]),
        action(isPrev) {
            return new Promise((resolve, reject) => {
                if (this.nextIndex !== null) {
                    let $main = $(this.$refs["main"]);
                    let $pages = $($main).children("ul.pt-page");
                    this.translate = new transition({
                        $main,
                        $pages,
                        loop: false,
                        callback: () => {
                            console.log("finish");
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
        handleAutoChange() {
            if (this.beginTime) {
                let dt = new Date().getTime() - this.beginTime;
                if (dt > this.renderData.change.singlePagePlayTime) {
                    this.nextPage();
                    this.beginTime = null;
                }
            }
        },
        autoChange() {
            if (this.renderData.change.loop) {
                setInterval(this.handleAutoChange.bind(this), 200);
            }
        },
        /**
         * 下一页
         */
        handleNextPage() {
            this.nextPage();
        },
        /**
         * 上一页
         */
        handlePrevPage() {
            this.prePage();
        },
        getCmp(id) {
            let page = this.$refs["singlePage"];
            if (page) {
                return page[0].getCmp(id);
            } else {
                return;
            }
        },
    },
    watch: {
        targetPage(next, old) {
            this.beginTime = null;
            this.nextIndex = next;
            this.currentState = 1;
            this.$nextTick(() => {
                this.action(old > next).then(() => {
                    this.jumpPageReal(next);
                    this.$nextTick(() => {
                        this.nextIndex = null;
                        this.currentState = 2;
                        this.beginTime = new Date().getTime();
                    });
                });
            });
        },
        renderData() {
            console.log("change");
        }
    }
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
