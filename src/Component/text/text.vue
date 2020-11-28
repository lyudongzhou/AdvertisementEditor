<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <div>{{ cmpConfig.props.text }}</div>
    </baseCmp>
</template>
<script>
import baseCmp from "../Base.vue";
export default {
    name: "textCmp",
    components: {
        baseCmp,
    },
    props: ["cmpConfig"],
    mounted() {
        this.parent = this.$refs["parent"];
    },
    methods:{
    }
};
</script>