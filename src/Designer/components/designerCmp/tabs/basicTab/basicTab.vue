<template>
    <div class="basic_tab">
        <el-form
            ref="form"
            size="mini"
            label-position="left"
            style="width:100%"
        >
            <el-form-item
                :label="editor.label"
                v-for="(editor, index) in editors"
                :key="index"
                style="width:100%"
            >
                <component
                    :is="editor.type"
                    :configData="configData"
                    :config="editor"
                    style="width:100%"
                ></component>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import '../../editors'
import { get } from '@/register'
import { REG_EDITORS } from '@/const'
export default {
    name: 'basicTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    mounted() {
        while (this.editors.length) {
            this.editors.pop()
        }
        this.config.children.forEach((ele) => {
            this.editors.push(ele)
        })
    },
    data() {
        return {
            editors: [],
        }
    },
}
</script>

<style lang="less">
.basic_tab {
    .el-form {
        .el-form-item:last-child {
            margin: 0;
        }
    }
}
</style>
