<template lang="html">
    <div class="preview">
        <div class="mask"></div>
        <button id="prevBtn" @click="handlePrevPage">上一页</button>
        <button id="nextBtn" @click="handleNextPage">下一页</button>

        <div id="pt-main" class="pt-perspective" v-if="this.pageData">
            <singlePage
                v-for="(page, index) in this.pageData"
                :key="page.id"
                ref="singlePage"
                class="pt-page"
                :pageState="index === 0 ? pageState : 0"
                :pageData="page"
                :pageIndex="page.id"
            ></singlePage>
        </div>
    </div>
</template>

<script>
import singlePage from "./Page";
import { mapActions, mapGetters } from "../store";
import { transition } from "../pageChange/libs/transition";

export default {
    name: "preview",
    data() {
        return {
            pageConfig: [this.renderData.pages[0]],
            renderChange: this.renderData.change,
            timer: null,
            isClick: true, // 数据渲染完成页面才可被切换
            isOperation: false, // 用户是否切页，是：count=0
            pageState: 0,
        };
    },
    props: ["renderData"],
    computed: {
        pageData: {
            get: function() {
                return this.pageConfig;
            },
            set: function(newValue = null) {
                this.pageConfig = newValue;
            },
        },
        ...mapGetters(["currentPage"]),
    },
    components: {
        singlePage,
    },
    created() {
        this.pageState = 1;
    },
    mounted() {
        this.pageState = 2;
        this.cutPageInit({
            $main: $("#pt-main"),
            $pages: $("#pt-main").children("ul.pt-page"),
        });
        this.countDown();
    },
    methods: {
        ...mapActions(["nextPage", "prevPage", "jumpPage"]),
        cutPageInit({ $main, $pages }) {
            this.translate = new transition({
                $main,
                $pages,
                loop: false,
                callback: () => {
                    this.pageState = 2;
                    // 删除非展示的页面数据
                    this.pageData.splice(
                        this.pageData.findIndex(
                            (child) =>
                                child.id !== this.renderData[this.currentPage]
                        ),
                        1
                    );
                },
            });
        },
        /**
         * 下一页
         */
        handleNextPage() {
            if (this.isClick) {
                if (
                    this.currentPage + 1 > this.renderData.pages.length - 1 &&
                    this.renderChange.loop
                ) {
                    this.jumpPage(-1);
                }
                if (this.currentPage + 1 <= this.renderData.pages.length - 1) {
                    this.isOperation = true;
                    this.pageState = 3;
                    this.nextPage();
                    this.changePageData().then(() => {
                        this.pageState = 1;
                        this.translate.nextPage(this.renderChange.type);
                    });
                }
                this.isClick = false;
            }
        },
        /**
         * 上一页
         */
        handlePrevPage() {
            if (this.isClick) {
                if (this.currentPage - 1 < 0 && this.renderChange.loop) {
                    this.jumpPage(this.renderData.pages.length - 1);
                    this.isOperation = true;
                    this.pageState = 3;
                    this.changePageData().then(() => {
                        this.pageState = 1;
                        this.translate.nextPage(this.renderChange.type + 1);
                    });
                } else if (this.currentPage - 1 >= 0) {
                    this.prevPage();
                    this.isOperation = true;
                    this.pageState = 3;
                    this.changePageData().then(() => {
                        this.pageState = 1;
                        this.translate.nextPage(this.renderChange.type + 1);
                    });
                }
                this.isClick = false;
            }
        },
        /**
         * 修改页面展示的数据
         */
        changePageData() {
            return new Promise((resolve) => {
                this.pageData.push(this.renderData.pages[this.currentPage]);
                this.$nextTick(() => {
                    // 更改切页数据
                    this.cutPageInit({
                        $main: $("#pt-main"),
                        $pages: $("#pt-main").children("ul.pt-page"),
                    });
                    resolve();
                });
            });
        },
        countDown() {
            let count = 0;
            this.timer = setInterval(() => {
                if (this.isOperation) {
                    this.isOperation = false;
                    count = 0;
                }
                if (count < this.renderChange.singlePagePlayTime) {
                    count++;
                    // console.log('platTime: ', count);
                } else if (count === this.renderChange.singlePagePlayTime) {
                    // console.log('platTime: ', count);
                    this.handleNextPage();
                }
            }, 1000);
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
    updated() {},
    watch: {},
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
            display: none;
            overflow: hidden;
            z-index: 0;
        }
        .pt-page-current {
            z-index: 1;
            display: inline-block;
        }
    }
}
</style>
