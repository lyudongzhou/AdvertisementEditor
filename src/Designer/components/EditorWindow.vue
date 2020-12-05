<template>
    <div
        class="fly"
        :class="[
            { hide_fly: isClose },
            { show_fly: tabs.length > 0 && !isClose },
        ]"
    >
        <el-container>
            <el-header class="editor_header">
                <span>Editor</span>
                <i class="el-icon-close" @click="closeSetDialog"></i>
            </el-header>
            <el-main class="noPadding">
                <el-collapse v-model="activeNames">
                    <el-collapse-item
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :title="tab.name"
                        :name="index"
                        class="collapse-item"
                    >
                        <component
                            :is="tab.type"
                            :configData="currentComponent"
                            :config="tab"
                            class="tabInner"
                        ></component>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { get } from '@/register'
import { REG_TABS, REG_COMPONENTSSCHEMA, DEFAULTTABS } from '@/const'
import './designerCmp'
import { mapGetters } from '../store'
export default {
    name: 'editorWin',
    components: get(REG_TABS),
    props: [],
    data() {
        return {
            activeNames: [0],
            isClose: true,
            tabs: [],
        }
    },
    computed: {
        ...mapGetters(['currentComponent']),
    },
    created() {},
    mounted() {
        this.onChangeType(this.currentComponent)
    },
    methods: {
        closeSetDialog() {
            this.isClose = true
        },
        onChangeType(data) {
            if (!data) {
                return
            }
            const schema = get(REG_COMPONENTSSCHEMA)[data.type]
            if (!schema) {
                return
            }
            const notSupport = {}
            while (this.tabs.length) {
                this.tabs.pop()
            }
            schema.notSupport &&
                schema.notSupport.forEach((ele) => {
                    notSupport[ele.type] = true
                })
            DEFAULTTABS.forEach((ele) => {
                if (!notSupport[ele.type]) {
                    this.tabs.push(ele)
                }
            })
            schema.extraTabs &&
                schema.extraTabs.forEach((ele) => {
                    this.tabs.push(ele)
                })
        },
    },
    watch: {
        currentComponent(data) {
            this.isClose = false
            this.onChangeType(data)
        },
    },
}
</script>

<style lang="less" scoped>
.fly {
    background-color: #555555;
    border: 5px solid #666666;
    border-radius: 10px;
    transition: transform 0.3s ease-out;
    color: snow;
    width: 300px;
    height: 800px;
    overflow: hidden;
    .editor_header {
        position: relative;
        text-align: center;
        height: 30px;
        line-height: 30px;
        i {
            position: absolute;
            right: 0;
            line-height: 30px;
            cursor: pointer;
        }
    }
    .noPadding {
        overflow: hidden;
        padding: 0;
        height: 760px;
        overflow-y: auto;
        .collapse-item {
            background-color: slategrey;
            .tabInner {
                padding: 10px;
                background-color: #cccccc;
            }
        }
    }
}
.hide_fly {
    transform: translate3d(-300px, 0, 0);
}
.show_fly {
    transform: translate3d(0, 0, 0);
}
</style>
