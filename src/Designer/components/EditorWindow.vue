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
                    <component :is="tab.type" :configData="editorData" :config="tab"></component>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<script>
import { get } from "@/registor";
import { REG_TABS, REG_COMPONENTSSCHEMA, DEFAULTTABS } from "@/const";
import "./designerCmp";
export default {
    name: "editorWin",
    components: get(REG_TABS),
    props: ["editorType", "editorData"],
    data() {
        return {
            activeNames: [0],
            editorSchema: null,
            tabs: [],
        };
    },
    created() {},
    mounted() {
        this.onChangeType(this.editorType);
    },
    methods: {
        onChangeType(data) {
            const schema = get(REG_COMPONENTSSCHEMA)[data];
            if (!schema) {
                return;
            }
            const notSupport = {};
            while (this.tabs.length) {
                this.tabs.pop();
            }
            schema.notSupport &&
                schema.notSupport.forEach((ele) => {
                    notSupport[ele.type] = true;
                });
            DEFAULTTABS.forEach((ele) => {
                if (!notSupport[ele.type]) {
                    this.tabs.push(ele);
                }
            });
        },
    },
    watch: {
        editorType(data) {
            this.onChangeType(data);
        },
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
