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
export default {
    name: 'VideoCmp',
    components: {
        baseCmp,
    },
    mounted() {
        var vm = this;
        this.$refs.videoEl.addEventListener('canplay', function () {
            window.console.log(vm.cmpConfig, this.videoWidth, this.videoHeight,">>>11>>")
        });
        this.parent = this.$refs['parent']
        window.console.log(this.parent, ">>>11>>")
    },
    methods: {
        // autoChangeVideoSize(videoWidth, videoHeight) {
        //     let { height, width } = this.cmpConfig.layoutConfig;
        //     const rate = videoWidth / videoHeight;
        //     if (rate > 1) {
        //         height = height * rate;
        //     } else {
        //         width = width * rate;
        //     }
        //     window.console.log(height, width, this.parent, ">>>11>>")
        // }
    },
    computed: {
        ...mapGetters(['handleUrl']),
    },
    beforeDestroy(){
    },
    props: ['cmpConfig'],
}
</script>
