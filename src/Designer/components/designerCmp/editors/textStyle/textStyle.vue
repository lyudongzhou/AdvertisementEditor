<template>
    <el-form ref="form" label-width="50px" size="mini" label-position="left">
        <el-form-item label="字体">
            <el-select
                v-model="fontFamily"
                placeholder="请选择"
                @change="onChange('props.fontFamily', fontFamily)"
            >
                <el-option
                    v-for="item in fontFamilies"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="倾斜">
            <el-radio
                v-model="fontStyle"
                label="normal"
                @change="onChange('props.fontStyle', fontStyle)"
                >正常</el-radio
            >
            <el-radio
                v-model="fontStyle"
                label="italic"
                @change="onChange('props.fontStyle', fontStyle)"
                >倾斜</el-radio
            >
        </el-form-item>
        <el-form-item label="字号">
            <numberField
                :configData="configData"
                :config="{ props: {}, target: 'props.fontSize' }"
            ></numberField>
        </el-form-item>
        <el-form-item label="颜色">
            <colorPicker
                :configData="configData"
                :config="{ props: {}, target: 'props.color' }"
            ></colorPicker>
        </el-form-item>
    </el-form>
</template>

<script>
import { getPropByPath } from '@/utils'
import Throttle from "../../../../manager/updateThrottle";
import numberField from '../numberField/numberField'
import colorPicker from '../vcolorpicker/vcolorpicker'
export default {
    name: 'textStyle',
    props: ['configData'],
    created() {},
    components: {
        numberField,
        colorPicker,
    },
    data() {
        return {
            fontFamily: '微软雅黑',
            fontFamilies: [
                {
                    value: '微软雅黑',
                    label: '微软雅黑',
                },
                {
                    value: '黑体',
                    label: '黑体',
                },
            ],
            fontStyle: 'normal',
        }
    },
    computed: {
        dataFontFamily() {
            return getPropByPath(this.configData, 'props.fontFamily')
        },
        dataFontStyle() {
            return getPropByPath(this.configData, 'props.fontStyle')
        },
    },
    methods: {
        onChange(target, value) {
            console.log('onChange',value)
            Throttle.update(target,value);
        },
    },
    watch: {
        text() {
            console.log('textChange')
        },
        dataFontStyle(text) {
            this.fontStyle = text
        },
        dataFontFamily(text) {
            this.fontFamily = text
        },
        configData(data1, data2) {
            console.log('dataConfigChange', data1 === data2)
        },
    },
    mounted() {
        this.isMounted = true
        this.fontFamily = this.dataFontFamily
        this.fontStyle = this.dataFontStyle
        console.log('init', this.text)
    },
}
</script>

<style></style>
