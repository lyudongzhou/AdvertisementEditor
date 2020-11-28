<template>
    <el-container class="fly">
        <el-header>Config</el-header>
        <el-main>
            <el-collapse v-model="activeNames">
                <el-collapse-item
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :title="tab.name"
                    :name="index"
                >
                    <component :is="tab.type"></component>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<script>

import { get } from "@/registor";
import {REG_TABS} from "@/const";
import "./designerCmp";
export default {
    name: "editorWin",
    components: get(REG_TABS),
    data() {
        return {
            activeNames: [0],
            tabs: [{ name: "Basic",type:"basicTab"}, { name: "Feature",type:"basicTab"}],
        };
    },
};
</script>

<style scoped>
.fly {
    position: absolute;
    width: 300px;
    height: 800px;
    background-color: red;
    z-index: 4;
}
</style>
