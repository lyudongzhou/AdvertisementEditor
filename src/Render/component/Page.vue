<template>
    <ul :style="fmtStyle(this.pageData)">
        <component
            v-for="(cmp, index) in pageData.components"
            :key="index"
            :is="cmp.type"
            :cmpConfig="cmp"
            :ref="cmp.id"
            :BASE_URL="BASE_URL"
        />
    </ul>
</template>
<script>
import html2canvas from "html2canvas";
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
    props: ["pageData", "pageIndex", "pageState"],
    components: cmps,
    data() {
        return {};
    },
    mounted() {
        if (!window.page) {
            window.page = this;
        }
    },
    created(){
        this.BASE_URL = BASE_URL;
    },
    watch: {
        pageState(data) {
            if (data === 2) {
                this.pageData.components.forEach((ele) => {
                    this.$refs[ele.id][0].parent.idleAction();
                });
            }
        },
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
        screenShots({width,height,canvas} = {}) {
          return new Promise((resolve)=>{
            let target = $(this.$el);
            var copyDom = target.clone();
            copyDom.width(width||target.width() + "px");
            copyDom.height(height||target.height() + "px");
            copyDom[0].style.top = "10000px";
            copyDom[0].style.position = "absolute";
            $("body").append(copyDom);
            html2canvas(copyDom[0],{
              allowTaint:true,
              useCORS:false,
              canvas:canvas
            }).then((canvas) => {
              copyDom.remove();
              resolve(canvas);
            });
          });
        },
        fmtStyle() {
            if (this.pageData.container.backGround.type === "image") {
                return {
                    "background-image": `url(${BASE_URL+this.pageData.container.backGround.value})`,
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
