<script>
  import { mapState } from '../store';
  export default {
    components: {
    },
    created() {
    },
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'currentPage',
        'pages'
      ]),
    }
  }
</script>

<template>
  <div class="them-dark-bg full-height overflow-auto p-sm">
    <el-card class="text-center" v-for="page in pages" :key="page.id">{{page.name}}</el-card>
  </div>
</template>