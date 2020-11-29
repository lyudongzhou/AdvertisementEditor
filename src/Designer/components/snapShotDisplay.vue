<!--
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 06:47:04
 * @LastEditTime: 2020-11-30 07:49:23
 * @Description: display screen shoot base64 image  
-->
<template>
  <el-container v-loading="loading" style="margin-top: 76.5px;transform: translateY(-50%);">
    <img :src="data" style="width: 100%; height: 100%" />
  </el-container>
</template>

<script>
import manager from "../manager/snapShot";
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

<style>
</style>
