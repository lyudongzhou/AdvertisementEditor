<!--
 * @Author: LyuDongzhou
 * @Date: 2020-11-14 18:31:47
 * @LastEditTime: 2020-12-07 03:50:06
 * @Description: file content
-->
<script>
import { mapMutations } from "../store";
export default {
  components: {},
  computed:{
  },
  created() {
    
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setPreviewState"]),
    handlePreview(){
      this.setPreviewState({previewTotal:true,previewing:true});
    }
  },
};
</script>

<template>
  <div>
    <el-button @click="handlePreview">预览</el-button>
    <el-button>保存</el-button>
    <el-button>提交</el-button>
    <el-button>一键发布</el-button>
    <el-button>退出</el-button>
  </div>
</template>