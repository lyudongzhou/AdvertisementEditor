<template>
  <el-container class="full-height">
    <el-header class="no-padding" height="50">
      <designer-header></designer-header>
    </el-header>
    <el-container class="main-container">

      <el-aside width="200px">
        <PageList></PageList>
      </el-aside>

      <el-main class="no-padding">
        <content-display></content-display>
      </el-main>

      <el-aside width="20px">
        <designer-operator></designer-operator>
      </el-aside>
      <el-aside width="200px">
        <editor></editor>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import DesignerHeader from './components/DesignerHeader.vue';
import PageList from './components/PageList.vue';
import ContentDisplay from './components/ContentDisplay.vue';
import DesignerOperator from './components/DesignerOperator.vue';
import Editor from './components/Editor.vue';

export default {
  name: 'designer',
  components: {
    DesignerHeader,
    PageList,
    ContentDisplay,
    DesignerOperator,
    Editor,
  },
  props: {
    json: Object,
  }
};
</script>

<style>
  .main-container {
    height: calc(100vh - 50px);
  }
</style>