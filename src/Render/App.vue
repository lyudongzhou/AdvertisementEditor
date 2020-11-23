<template>
    <div
        id="app"
        :style="{
            position: 'absolute',
            width: deviceWidth + 'px',
            height: deviceHeight + 'px',
            'background-color': 'lightgray',
        }"
    >
        <render
            v-if="renderData"
            :renderData="renderData"
            :currentPage="currentPage"
            @click="onClick"
            :designMode="false"
            :style="{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }"
        ></render>
    </div>
</template>
<script>
import render from "./render";
// import { renderData } from "../../interface";
export default {
    components: {
        render,
    },
    methods: {
        onClick() {},
    },
    created() {
      this.$axios.get("/testSchema").then(({ data }) => {
        this.renderData = data;
      });
    },
    data() {
        return {
            containerStyle: {},
            deviceWidth: document.body.clientWidth,
            deviceHeight: document.body.clientHeight,
            renderData: null,
            currentPage: 0,
        };
    },
};
</script>
<style scoped></style>
