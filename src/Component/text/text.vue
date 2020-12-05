<template>
    <baseCmp ref="parent" :cmpConfig="cmpConfig">
        <div :style="publicList">{{ cmpConfig.props.text }}</div>
    </baseCmp>
</template>
<script>
import baseCmp from '../Base.vue'
export default {
    name: 'textCmp',
    components: {
        baseCmp,
    },
    props: ['cmpConfig'],
    mounted() {
        this.parent = this.$refs['parent']
    },
    computed: {
        textStyle() {
            return this.cmpConfig.props
        },
        publicList() {
            const style = {}
            Object.keys(this.textStyle).forEach((key) => {
                switch (key) {
                    case 'fontFamily':
                        style['font-family'] = this.textStyle[key]
                        break
                    case 'fontWeight':
                        style['font-weight'] = this.textStyle[key] + 'px'
                        break
                    case 'fontStyle':
                        style['font-style'] = this.textStyle[key]
                        break
                    case 'fontSize':
                        style['font-size'] = this.textStyle[key] + 'px'
                        break
                    case 'color':
                        style['color'] = this.textStyle[key]
                }
            })
            return style
        },
    },
}
</script>
