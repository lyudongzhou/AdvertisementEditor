<template>
    <el-color-picker
        v-model="color"
        @change="onChange"
    ></el-color-picker>
</template>

<script>
import { getPropByPath } from '@/utils'
import { mapMutations } from '../../../../store'
import {
    UPDATE_COMPONENT_PROPS
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
            console.log("change");
            if (this.isMounted) {
                this.changeFun(UPDATE_COMPONENT_PROPS)
            }
        },
    },
}
</script>

<style></style>
