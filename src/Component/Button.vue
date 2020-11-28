<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <div @click="handleClick">{{ cmpConfig.name }}</div>
    </baseCmp>
</template>
<script>
import baseCmp from "./Base.vue";
export default {
    name: "BtnCmp",
    components: {
        baseCmp,
    },
    props: ["cmpConfig"],
    mounted() {
        this.parent = this.$refs["parent"];
    },
    methods:{
        handleClick(){
            console.log("btnClick");
        }
    }
};
</script>
