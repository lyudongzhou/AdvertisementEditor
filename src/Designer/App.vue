<template>
  <designer></designer>
</template>
<script>

import designer from './Designer.vue';
export default {
  components: {
    designer,
  },
  created() {
    console.info('create')
  },
  data() {
    return {};
  }
};
</script>
<style>

</style>