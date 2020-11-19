<template>
    <ul :style="fmtStyle(this.pageData)">
        <component
            v-for="(cmp, index) in pageData.components"
            :key="index"
            :is="cmp.type"
            :cmpConfig="cmp"
            :ref="cmp.id"
        />
    </ul>
</template>
<script>
import * as components from "../../Component";
const cmps = {};
for (let i in components) {
    cmps[components[i].name] = components[i];
}
//props属性：
//pageState
//0 准备进入 1 进入中 2 已进入 3 弹出中*
export default {
    name: "singlePage",
    props: ["pageData", "pageIndex"],
    components: cmps,
    data() {
        return {
            pageState: 0,
        };
    },
    watch: {
        pageState(data) {
            if (data === 1) {
                this.pageData.components.forEach((ele) => {
                    this.$refs[ele.id][0].parent.inAction();
                });
            } else if (data === 2) {
                this.pageData.components.forEach((ele) => {
                    this.$refs[ele.id][0].parent.idleAction();
                });
            }else if(data===3){
                this.pageData.components.forEach((ele) => {
                    this.$refs[ele.id][0].parent.outAction();
                });
            }
        },
    },
    methods: {
        fmtStyle() {
            if (this.pageData.container.backGround.type === "image") {
                return {
                    "background-image": `url(${this.pageData.container.backGround.value})`,
                    width: "100%",
                    height: "100%",
                };
            } else {
                return {
                    "background-color": this.pageData.container.backGround
                        .value,
                    width: "100%",
                    height: "100%",
                };
            }
        },
    },
    mounted() {
        window.abc = this;
        // console.log(this.pageData);
    },
};
</script>
