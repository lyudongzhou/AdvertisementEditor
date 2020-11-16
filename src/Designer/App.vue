<template>
  <designer @submit="handleSubmit" ref="designer"></designer>
</template>
<script>

import designer from './Designer.vue';
import testSchema from './mock/testSchema';

export default {
  components: {
    designer,
  },
  created() {
    setTimeout(() => {
      this.$refs.designer.openProject(testSchema);
    }, 100);
  },
  methods: {
    handleSubmit() {

    }
  }
};
</script>
<style>

</style>