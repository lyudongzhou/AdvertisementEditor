<template>
    <div class="basic_tab">
        <el-image
            style="width: 100px; height: 100px;margin-right:50px"
            :src="configData.props.bgUrl"
            fit="contain"
        ></el-image>
        <el-button type="primary"
            >上传<i class="el-icon-upload el-icon--right"></i
        ></el-button>
    </div>
</template>

<script>
import '../../editors'
import { get } from '@/register'
import { REG_EDITORS } from '@/const'
// import { mapState } from '../../../../store'
export default {
    name: 'imageTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
    mounted() {},
    computed: {
        // ...mapState(['vmSchema']),
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
