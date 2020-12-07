<template lang="html">
    <div class="popupList">
        <ul>
            <li
                v-for="(dialog, index) in dialogs"
                :key="dialog.id"
                @click="switchCurrentPage(dialog)"
            >
                <p class="list_index">{{ index + 1 }}</p>
                <p class="list_window">
                    <snapShotDisplay :id="dialog.id"></snapShotDisplay>
                </p>
                <span class="add_dialog el-icon-plus" @click="addDialog"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from '../../store';
import snapShotDisplay from '../snapShotDisplay';
import manager from '../../manager/snapShot';
import schemaMixin from '../../mixin/schemaMixin';

export default {
    name: 'PopupList',
    mixins: [schemaMixin],
    components: {
        snapShotDisplay,
    },
    computed: {
        ...mapGetters(['dialogs']),
        ...mapState(['currentPageId']),
    },
    methods: {
        ...mapMutations(['selectPage']),
        /**
         * 点击缩略图切换页面
         * @param {Object} page
         */
        switchCurrentPage(dialog) {
            manager.addTask(this.currentPageId)
            this.selectPage({ id: dialog.id, currentPageType: 'dialog' })
        },
        addDialog () {
          this.$$addPage('dialog');
        }
    },
    watch: {
        // dialog (newValue) {
        //   newValue.forEach((ele) => {
        //     manager.addTask(ele.id);
        //   });
        // },
    },
}
</script>

<style lang="less" scoped>
.popupList {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
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
            .list_window {
                width: 124px;
                height: 157px;
            }
            >span {
              position: absolute;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              left: 146px;
              top: 163px;
              font-size: 20px;
              background: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #000000;
              font-weight: bold;
            }
            .add_dialog {
              display: none;
            }
        }
        li:hover {
            cursor: pointer;
            background: #727272;
            .add_dialog {
              display: flex;
            }
        }
    }
}
</style>
