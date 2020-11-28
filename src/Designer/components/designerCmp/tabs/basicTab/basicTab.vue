<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item
                :label="editor.label"
                v-for="(editor, index) in editors"
                :key="index"
            >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "basicTab",
    data() {
        return {
            editors: [
                {
                    label: "字体颜色",
                    type: "colorPicker",
                    target: ["props", "textColor"],
                    props: {
                        allowEmpty: false,
                    },
                },
            ],
        };
    },
};
</script>

<style></style>
