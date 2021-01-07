<template>
    <div class="basic_tab">
        <textStyle :configData="configData" :config="config"></textStyle>
    </div>
</template>

<script>
import '../../editors'
import { get } from '@/register'
import { REG_EDITORS } from '@/const'
// import { mapState } from '../../../../store'
export default {
    name: 'textTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    mounted() {},
    computed: {
        // ...mapState(['schema']),
    },
    methods: {},
    data() {
        return {
            url: 'images/Koala.jpg',
        }
    },
}
</script>

<style lang="less" scope>
.basic_tab {
    display: flex;
    align-items: center;
}
</style>
