<template>
    <div
        :style="{
            position: 'relative',
            width: renderData.container.width + 'px',
            height: renderData.container.height + 'px',
        }"
    >
        <audio ref="bgm" :src="renderData.container.bgm.src"></audio>
        <!-- <singlePage
            :pageData="renderData.pages[currentIndex]"
            :pageIndex="currentIndex"
        ></singlePage> -->
      <preview ref="preview" :renderData="renderData" :currentIndex="currentIndex"></preview>
    </div>
</template>
<script>
// import ImageCmp from "../Component/Image.vue";
// import singlePage from "./component/Page";
import preview from "./component/Preview";
import pipe from "./pipe";
export default {
    name: "app",
    props: ["renderData", "currentPage", "designMode"],
    data() {
        return {};
    },
    computed: {
        currentIndex() {
            return this.$store.state.currentRenderState.currentPage;
        },
        pageCount() {
            return this.renderData.pages.length;
        },
    },
    watch: {
        pageCount(data) {
            this.$store.commit("currentRenderState/pageCountChange", data);
        },
        currentPage(data) {
            this.$store.commit("currentRenderState/jumpPage", data);
        },
        designMode(data) {
            this.$store.commit("currentRenderState/setDesignMode", data);
        },
    },
    created() {
        this.$store.commit(
            "currentRenderState/pageCountChange",
            this.pageCount
        );
        this.$store.commit("currentRenderState/setDesignMode", this.designMode);
        pipe.on("click", (dom, componentId) => {
            this.$emit("click", dom, componentId);
        });
    },
    components: {
        // singlePage,
        preview
        // ImageCmp
    },
    mounted() {
        if (this.renderData.container.bgm.autoPlay) {
            this.$refs.bgm.play();
        }
    },
    methods: {
        getCmp(id){
            return this.$refs["preview"].getCmp(id);
        }
    },
};
</script>

<style></style>
