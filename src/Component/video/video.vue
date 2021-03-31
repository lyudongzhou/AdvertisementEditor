<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <video
            ref="videoEl"
            autoplay
            :src="handleUrl(cmpConfig.props.bgUrl)"
            style="width:100%;height:100%"
        />
    </baseCmp>
</template>
<script>
import baseCmp from '../Base.vue'
import { mapGetters } from '../../Render/store/'
import editorConfig from "./editorConfig";
export default {
    name: 'VideoCmp',
    components: {
        baseCmp,
    },
    mounted() {
        var vm = this;
        this.$refs.videoEl.addEventListener('canplay', function () {
            vm.autoChangeVideoSize(this.videoWidth, this.videoHeight)
        });
        this.parent = this.$refs['parent']
    },
    methods: {
        autoChangeVideoSize(videoWidth, videoHeight) {
            const rate = videoWidth / videoHeight;
            let width = editorConfig[0]['defaultSchema']['layoutConfig']['width'];
            let height = editorConfig[0]['defaultSchema']['layoutConfig']['height'];
            if (rate > 1) {
                height = height / rate;
            } else {
                width = width * rate;
            }
            this.$event.emit("changeContainerSize", {
                left: 0,
                top: 0,
                width,
                height,
            })
        },
    },
    computed: {
        ...mapGetters(['handleUrl']),
    },
    beforeDestroy(){
    },
    props: ['cmpConfig'],
}
</script>
