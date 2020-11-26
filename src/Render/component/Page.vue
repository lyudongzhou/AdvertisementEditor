<template>
    <ul :style="fmtStyle(this.pageData)" ref="page">
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
import html2canvas from "html2canvas";
import * as components from "../../Component";
import {mapGetters} from "../store";
const cmps = {};
for (let i in components) {
    cmps[components[i].name] = components[i];
}
//props属性：
//pageState
//0 准备进入 1 进入中 2 已进入 3 弹出中*
export default {
    name: "singlePage",
    props: ["pageData", "pageIndex", "pageState"],
    components: cmps,
    data() {
        return {};
    },
    mounted() {
    },
    created(){
    },
    computed: {
        ...mapGetters(['handleUrl'])
    },
    watch: {
        pageState(data) {
            if (data === 2) {
                this.pageData.components.forEach((ele) => {
                    this.$refs[ele.id][0].parent.idleAction();
                });
            }
        },
        pageData(){
            console.log("page","change");
        }
    },
    methods: {
        getCmp(id){
            let cmp = this.$refs[id];
            if(cmp){
                return cmp[0];
            }else{
                return null;
            }
        },
        screenShots({width, height} = {}) {
          return new Promise((resolve)=>{
            html2canvas(this.$refs.page, {
              width, height,
              allowTaint: true,
              useCORS: false,
            }).then((canvas) => {
              resolve(canvas);
            });
          });
        },
        fmtStyle() {
            if (this.pageData.container.backGround.type === "image") {
                return {
                    "background-image": `url(${this.handleUrl(this.pageData.container.backGround.value)})`,
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
};
</script>
