<template>
    <el-color-picker
        v-model="color"
        @active-change="onChange"
        @change="onInput"
    ></el-color-picker>
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
    name: 'vcolorpicker',
    props: ['configData', 'config'],
    data() {
        return {
            color: '#778899',
        }
    },
    computed: {
        dataColor() {
            return getPropByPath(this.configData, this.config.target)
        },
    },
    mounted() {
        this.isMounted = true
        this.color = getPropByPath(this.configData, this.config.target)
    },
    watch: {
        dataColor(text) {
            this.color = text
        },
    },
    methods: {
        ...mapMutations(['updateSchema']),
        changeFun(type) {
            this.updateSchema({
                type: type,
                value: {
                    [this.config.target]: this.color,
                },
            })
        },
        onChange() {
            this.onFocus()
            this.changeFun(UPDATING_COMPONENT_PROPS)
        },
        onFocus() {
            this.changeFun(BEFORE_UPDATE_COMPONENT_PROPS)
        },
        onInput() {
            if (this.isMounted) {
                this.changeFun(AFTER_UPDATE_COMPONENT_PROPS)
            }
        },
    },
}
</script>

<style></style>
