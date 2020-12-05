<template lang="html">
    <div class="thumbnailShow">
        <!-- thumbnailShow -->
        <div class="hideDom" ref="hideDom">
            <singlePage ref="singlePage" :pageData="page"></singlePage>
        </div>
        <!-- canvas add li -->
        <ul>
            <li
                v-for="page in pages"
                :key="page.id"
                @click="switchCurrentPage(page)"
            >
                <p class="list_index">{{ page.id }}</p>
                <p class="list_thumbnail" ref="listThumbnail"></p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from '../../store'
import singlePage from '../../../Render/component/Page.vue'

export default {
    name: 'ThumbnailShow',
    components: {
        singlePage,
    },
    computed: {
        ...mapGetters(['pages']),
    },
    created() {},
    mounted() {
        if (this.pages.length > 0) {
            this.renderThumbnail(this.pages)
        }
    },
    updated() {},
    methods: {
        ...mapMutations(['switchPage']),
        renderOne(pageData) {},
        renderThumbnail(pages) {
            pages.forEach((page, index) => {
                let hideDomWidth = this.$refs.hideDom[index].offsetWidth,
                    hideDomHeight = this.$refs.hideDom[index].offsetHeight,
                    offsetWidth = 124,
                    offsetHeight = 157,
                    scaleX = offsetWidth / hideDomWidth,
                    scaleY = offsetHeight / hideDomHeight
                let currentPage = this.$refs.singlePage[index]
                currentPage
                    .screenShots({
                        width: this.$refs.hideDom[index].offsetWidth,
                        height: this.$refs.hideDom[index].offsetHeight,
                    })
                    .then((canvas) => {
                        canvas.style.transform = `scale(${scaleX}, ${scaleY})`
                        canvas.style['transform-origin'] = '0 0'
                        this.$refs.listThumbnail[index].appendChild(canvas)
                        this.$refs.hideDom[index].style.display = 'none'
                    })
            })
        },
        /**
         * 点击缩略图切换页面
         * @param {Object} page
         */
        switchCurrentPage(page) {
            this.switchPage(page)
        },
    },
    watch: {
        pages(newValue) {
            this.$nextTick(() => {
                this.renderThumbnail(newValue)
            })
        },
    },
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
    }
}
</style>
