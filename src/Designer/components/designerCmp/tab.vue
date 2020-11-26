<template>
    <el-collapse-item :title="baseConfig.name">
        <component
            v-for="(cmp, index) in baseConfig.configs"
            :key="index"
            :is="cmp.type"
            :config="cmp"
            :data="data"
        />
    </el-collapse-item>
</template>

<script>
const type = {
    name:"基本配置",
    configs:[{
        type:"colorPicker",
        dataProp:["layoutConfig.top"]
    }]
};
import cmp from "./index.js";
export default {
    data(){
        return {
            baseConfig:type,
            data:{
                layoutConfig:{
                    top:10
                }
            }
        };
    },
    props:["title","cmpData"],
    components:{...cmp}
};
</script>

<style></style>
