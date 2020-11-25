<template>
  <el-container class="full-height">
    <el-header class="no-padding" height="55px">
      <designer-header></designer-header>
    </el-header>
    <el-container class="main-container">

      <el-aside width="200px">
        <editor></editor>
      </el-aside>

      <el-main class="no-padding">
        <content-display></content-display>
      </el-main>

      <el-aside width="20px">
        <designer-operator></designer-operator>
      </el-aside>
      <el-aside width="298px">
        <PageFrame></PageFrame>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import DesignerHeader from './components/DesignerHeader.vue';
import PageFrame from './components/PageFrame.vue';
import ContentDisplay from './components/ContentDisplay.vue';
import DesignerOperator from './components/DesignerOperator.vue';
import Editor from './components/Editor.vue';
import {mapMutations} from './store';

export default {
  name: 'designer',
  components: {
    DesignerHeader,
    PageFrame,
    ContentDisplay,
    DesignerOperator,
    Editor,
  },
  mounted () {
  },
  methods: {
    openProject(schema) {
      this.resetSchema(schema);
    },
    ...mapMutations(['resetSchema']),
  }
};
</script>

<style lang="less">
  .main-container {
    height: calc(100vh - 55px);
    .no-padding {
      position: relative;
    }
  }
</style>
