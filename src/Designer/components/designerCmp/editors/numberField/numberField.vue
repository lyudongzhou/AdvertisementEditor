<template>
    <el-input v-model="text" placeholder="请输入内容"></el-input>
</template>

<script>
export default {
    name: "numberField",
    props: ["configData", "config"],
    data() {
        return {
            text: "",
        };
    },
    mounted() {
        let o = this.configData;
        this.config.forEach((ele) => {
            o = o[ele];
        });
        this.text = o;
    },
    watch: {
        text(data) {
            let o = this.configData;
            for (let i = 0; i < this.config.length - 1; i++) {
                o = o[this.config[i]];
            }
            o[this.config[this.config.length-1]] = data;
        },
    },
};
</script>

<style></style>
