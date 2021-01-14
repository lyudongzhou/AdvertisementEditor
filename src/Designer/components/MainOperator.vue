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
    ...mapState(['schema', 'projectInfo']),
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
      this.$event.emit(SUBMIT_PROJECT, {id: this.projectInfo.id, schema: this.schema});
    }
  },
};
</script>

<template>
  <div class="main-operator">
    <el-button @click="handlePreview">预览</el-button>
    <el-button @click="submitProject" type="button">提交</el-button>
    <el-button plain>发布</el-button>
    <el-button plain>退出</el-button>
  </div>
</template>


<style lang="less">
  .main-operator {

    line-height: 55px;

    .el-button {
      height: 36px;
      background: #6E6F71;
      color: #fff;
      border-radius: 5px;
      border: none;
      &:hover, &:active, &:focus {
        background: #6E6F71;
        color: #fff;
        opacity: .8;
      }

      &.is-plain {
        background: #ECECEC;
        color: #333;
        &:hover, &:active, &:focus {
          background: #ECECEC;
          color: #333;
          opacity: .8;
        }
      }
    }
  }
</style>