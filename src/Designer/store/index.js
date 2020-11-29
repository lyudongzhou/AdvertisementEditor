import Vuex from 'vuex';
import Vue from 'vue';
import designer from './designerModule';
import { createNamespacedHelpers } from 'vuex';

export const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('designer');

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    designer,
  },
});
