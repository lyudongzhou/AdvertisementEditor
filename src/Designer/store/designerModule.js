import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      schema: {},
      vmSchema: {},
      currentPage: {},
      currentComponentId: 0,
      currentComponentInfo: null,
      currentIndex: 1,
      pages: [],
      opened: false,
    };
  },
  getters: {
    currentComponent(state) {
      if (state.currentPage && state.currentComponentId) {
        return state.currentPage.components.find(({id}) => state.currentComponentId === id) || null;
      }
      return null;
    },
    getPages (state) {
      return state.pages;
    }
  },
  mutations,
};
