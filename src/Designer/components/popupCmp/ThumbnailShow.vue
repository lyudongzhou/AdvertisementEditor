<template lang="html">
    <div class="thumbnailShow">
        <ul>
            <li
                v-for="(dialog, index) in dialogs"
                :class="dialog.id === currentPageId ? 'list_active' : ''"
                :key="dialog.id"
                @click="switchCurrentPage(dialog)"
            >
                <p class="list_index">{{ index + 1 }}</p>
                <p class="list_thumbnail">
                    <snapShotDisplay :id="dialog.id"></snapShotDisplay>
                </p>
                <span class="del_page el-icon-minus" @click.stop="deletePage(dialog.id)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from '../../store';
import snapShotDisplay from '../snapShotDisplay';
import manager from '../../manager/snapShot';
import {DELETE_PAGE} from '../../constant/schema';

export default {
    name: 'ThumbnailShow',
    components: {
        snapShotDisplay,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['dialogs']),
        ...mapState(['currentPageId']),
    },
    created() {},
    mounted() {
      this.$event.on('correct', (id) => {
        this.updateSchema({type: DELETE_PAGE, targetId: id, currentPageType: 'dialog'});
      });
    },
    updated() {},
    methods: {
        ...mapMutations(['selectPage', 'updateSchema']),
        /**
         * 点击缩略图切换页面
         * @param {Object} dialog
         */
        switchCurrentPage(dialog) {
          manager.addTask(this.currentPageId, false, true)
          this.selectPage({
            id: dialog.id,
            currentPageType: 'dialog'
          })
        },
        deletePage (id) {
          this.$event.emit('openPromptDialog', id);
        },
    },
    watch: {
    },
}
</script>

<style lang="less" scoped>
.thumbnailShow {
    width: 100%;
    height: auto;
    > ul {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 157px;
        li {
            width: 100%;
            height: 210px;
            display: flex;
            position: relative;
            align-items: center;
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
                margin: 0 38px 0 31px;
            }
            .list_thumbnail {
                width: 124px;
                height: 157px;
            }
            >span {
              position: absolute;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              left: 148px;
              top: 163px;
              font-size: 20px;
              background: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #000000;
              font-weight: bold;
              display: none;
              border: 1px solid #d8c8c8;
              box-sizing: border-box;
            }
        }
        li:hover {
            cursor: pointer;
            background: #727272;
            .add_page,.del_page {
              display: flex;
            }
        }
        .list_active {
            cursor: pointer;
            background: #727272;
        }
    }
}
</style>
