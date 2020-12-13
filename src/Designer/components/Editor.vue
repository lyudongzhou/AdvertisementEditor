<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:13:50
 * @LastEditTime: 2020-12-13 20:29:34
 * @Description: file content
-->
<script>
import resources from "./resources";
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  components:{resources},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<template>
  <el-container style="height: 100%">
    <el-aside width="50px">
      <el-menu
        default-active="1-4-1"
        @open="handleOpen"
        @close="handleClose"
        :collapse="false"
      >
        <el-menu-item index="1"> 素材 </el-menu-item>
        <el-menu-item index="2"> 节目 </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="padding: 0px">
        <el-container>
          <el-header style="padding: 0px">
            <el-tabs type="card">
              <el-tab-pane
                label="机构"
                name="first"
                style="width: 125px"
              ></el-tab-pane>
              <el-tab-pane
                label="商城"
                name="second"
                style="width: 125px"
              ></el-tab-pane>
            </el-tabs>
          </el-header>
          <el-main>
            
          </el-main>
        </el-container>
      </el-header>
      <el-main><resources></resources></el-main>
    </el-container>
  </el-container>
</template>
