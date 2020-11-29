<template>
    <el-input
        v-model="text"
        placeholder="请输入内容"
        @change="onChange"
        @focus="onFocus"
        @input="onInput"
    ></el-input>
</template>

<script>
import { getPropByPath } from '@/utils'
import { mapMutations } from '../../../../store'
import {
    BEFORE_UPDATE_COMPONENT_PROPS,
    UPDATING_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
} from '../../../../constant/schema'
export default {
    name: 'numberField',
    props: ['configData', 'config'],
    data() {
        return {
            text: '',
        }
    },
    computed: {
        dataText() {
            return getPropByPath(this.configData, this.config)
        },
    },
    methods: {
        ...mapMutations(['updateSchema']),
        changeFun(type) {
            this.updateSchema({
                type: type,
                value: {
                    [this.config]: this.text,
                },
            })
        },
        onChange() {
            this.changeFun(UPDATING_COMPONENT_PROPS)
        },
        onFocus() {
            this.changeFun(BEFORE_UPDATE_COMPONENT_PROPS)
        },
        onInput() {
            this.changeFun(AFTER_UPDATE_COMPONENT_PROPS)
        },
    },
    watch: {
        dataText(text) {
            this.text = text
        },
        configData(data1, data2) {
            console.log('dataConfigChange', data1 === data2)
        },
    },
    mounted() {
        this.text = getPropByPath(this.configData, this.config)
    },
}
</script>

<style></style>
