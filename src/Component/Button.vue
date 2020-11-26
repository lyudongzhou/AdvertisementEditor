<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <div>{{ cmpConfig.name }}</div>
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
    watch:{
        cmpConfig(){
            console.log("change");
        }
    }
};
</script>
