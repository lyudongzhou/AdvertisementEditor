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
    const urlSearchParams = new URLSearchParams(location.search);
    // todo remove testCode
    const id = urlSearchParams.get('id') || 1;
    const templateId = urlSearchParams.get('templateId');
    if (!id && templateId) {
      this.$axios.get('/template/get/id', {templateId: id}).then(({data}) => {
        this.$refs.designer.openProject(data.bodyJson);
      });
    } else if (id) {
      this.$axios.get('/program/get/id', {programId: id}).then(({data}) => {
        this.$refs.designer.openProject(data.programData);
      });
    }
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
