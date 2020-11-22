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
<<<<<<< HEAD
    window.axios = this.$axios;
    console.log(BASE_URL);
    this.$axios.get(BASE_URL+"schema").then(({data}) => {
      this.$refs.designer.openProject(JSON.parse(data));
=======
    this.$axios.get('schema.json').then(({data}) => {
    // this.$axios.get('designer/schema.json').then(({data}) => {
      this.$refs.designer.openProject(data);
>>>>>>> a81869241680cb32f3201e4b940f37159fafc1f8
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
