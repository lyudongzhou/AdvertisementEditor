<!--
 * @Author: LyuDongzhou
 * @Date: 2020-11-14 18:31:47
 * @LastEditTime: 2020-12-07 03:50:06
 * @Description: file content
-->
<script>
import { mapMutations, mapState } from "../store";
import {SUBMIT_PROJECT} from '../constant/event';
export default {
  components: {},
  computed:{
    ...mapState(['schema', 'projectId']),
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
    },
    submitProject() {
      this.$event.emit(SUBMIT_PROJECT, {id: this.projectId, schema: this.schema});
    }
  },
};
</script>

<template>
  <div>
    <el-button @click="handlePreview">预览</el-button>
    <el-button @click="submitProject" type="button">提交</el-button>
    <el-button>一键发布</el-button>
    <el-button>退出</el-button>
  </div>
</template>