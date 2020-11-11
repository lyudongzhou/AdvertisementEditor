<template>
  <designer :json="schema"></designer>
</template>
<script>

import designer from './Designer.vue';
import testSchema from './mock/testSchema';
import {mapState} from 'vuex';

export default {
  components: {
    designer,
  },
  created() {
    this.$store.commit('resetSchema', testSchema);
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['schema'])
  }
};
</script>
<style>

</style>