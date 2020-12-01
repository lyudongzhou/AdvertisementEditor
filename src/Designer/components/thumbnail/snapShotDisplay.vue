<template>
  <el-container v-loading="loading">
    <img :src="data" style="width: 100%; height: 100%" />
  </el-container>
</template>

<script>
import manager from "../../manager/snapShot";
export default {
  name: "snapShotDisplay",
  props: ["id"],
  data() {
    return { data: "",loading:true };
  },
  watch:{
      data(value){
          if(value){
              this.loading = false;
          }else{
              this.loading = true;
          }
      }
  },
  mounted() {
    manager.addTask(this.id);
    this.data = manager.getResult(this.id);
    manager.on("change", ({ id, data }) => {
      if (id === this.id) {
        this.data = data;
      }
    });
  },
};
</script>

<style lang="less">
  .el-container {
    .el-loading-mask {
      .el-loading-spinner {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        margin: 0;
        top: 0;
      }
    }
  }
</style>
<style lang="less" scoped>
  .el-container {
    width: 100%;
    height: 100%;
    .el-loading-mask {
      .el-loading-spinner {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
