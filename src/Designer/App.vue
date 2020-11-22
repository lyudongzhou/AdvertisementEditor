<template>
  <designer @submit="handleSubmit" ref="designer"></designer>
</template>
<script>

import designer from './Designer.vue';

export default {
  components: {
    designer,
  },
  created() {
    window.axios = this.$axios;
    console.log(BASE_URL);
    this.$axios.get(BASE_URL+"schema").then(({data}) => {
      this.$refs.designer.openProject(JSON.parse(data));
    })
  },
  methods: {
    handleSubmit() {

    }
  }
};
</script>
<style>

</style>
