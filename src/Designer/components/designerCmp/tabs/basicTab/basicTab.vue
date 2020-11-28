<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item
                :label="editor.label"
                v-for="(editor, index) in editors"
                :key="index"
            >
            <component :is="editor.type" :configData="configData" :config="editor.target"></component>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import "../../editors";
import {get} from "@/registor";
import {REG_EDITORS} from "@/const";
export default {
    name: "basicTab",
    components:get(REG_EDITORS),
    props:["configData","config"],
    mounted(){
        while(this.editors.length){
            this.editors.pop();
        }
        this.config.children.forEach(ele=>{
            this.editors.push(ele);
        });
    },
    data() {
        return {
            editors: [
                
            ]
        };
    },
};
</script>

<style></style>
