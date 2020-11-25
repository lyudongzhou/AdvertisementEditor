<template>
  <designer @submit="handleSubmit" ref="designer"></designer>
</template>
<script>

import designer from './Designer.vue';

export default {
  components: {
    designer,
  },
  data () {
    return {
    }
  },
  created() {
    this.$axios.get("/schema").then(({data}) => {
      this.$refs.designer.openProject(data);
    })
  },
  mounted () {
  },
  methods: {
    handleSubmit() {

    }
  }
};
</script>
<style>

</style>
