import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      schema: {},
      vmSchema: {},
      currentPage: {},
      currentComponentId: 0,
      currentComponentInfo: null,
      currentIndex: 1,
      pages: [],
    };
  },
  getters: {
    currentComponent(state) {
      if (state.currentPage && state.currentComponentId) {
        return state.currentPage.components.find(({id}) => state.currentComponentId === id) || null;
      }
      return null
    }
  },
  mutations,
});