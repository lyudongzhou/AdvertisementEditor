<!--
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-11-30 05:29:17
 * @Description: A template for render single page or single dialog
-->
<template>
    <ul :style="fmtStyle(this.pageData)" ref="page" :key="pageData.id">
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
import "../../Component";
import {get} from "@/register";
import {REG_COMPONENTS} from "@/const";
import {mapGetters} from "../store";
//props属性：
//pageState
//0 准备进入 1 进入中 2 已进入 3 弹出中*
export default {
    name: "singlePage",
    props: ["pageData", "pageState"],
    components: get(REG_COMPONENTS),
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
