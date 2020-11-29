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
            :baseUrl="baseUrl"
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
    },
    data() {
        return {
            containerStyle: {},
            deviceWidth: document.body.clientWidth,
            deviceHeight: document.body.clientHeight,
            renderData: window.renderData,
            currentPage: "1",
            baseUrl: '',
        };
    },
};
</script>
<style scoped></style>
