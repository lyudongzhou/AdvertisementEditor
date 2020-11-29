<template>
    <el-color-picker v-model="color"></el-color-picker>
</template>

<script>
import {getPropByPath,setPropByPath} from "@/utils";
export default {
    name: "vcolorpicker",
    data() {
        return {
            color: "#778899",
        };
    },
    mounted() {
        this.color = getPropByPath(this.configData, this.config);
    },
    watch: {
        color(data) {
            setPropByPath(this.configData, this.config, data);
        },
    },
};
</script>

<style></style>
