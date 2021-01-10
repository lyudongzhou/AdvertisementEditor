<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <video
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
        this.parent = this.$refs['parent']
    },
    computed: {
        ...mapGetters(['handleUrl']),
    },
    beforeDestroy(){
    },
    props: ['cmpConfig'],
}
</script>
