import mutations from './mutations';

export default {
  namespaced: true,
  state () {
    return {
      schema: {},
      vmSchema: {},
      currentPage: {},
      currentComponentId: 0,
      currentIndex: 1,
      opened: false,
    };
  },
  getters: {
    currentComponent (state, getters) {
      console.log(state.currentComponentId);
      if (getters.currentPage && state.currentComponentId) {
        return getters.currentPage.components.find(({ id }) => state.currentComponentId === id) || null;
      }
      return null;
    },
    currentPage (state, getters) {
      if (state.currentPageId) {
        return getters.pages.find(({ id }) => state.currentPageId === id) || null;
      }
      return null
    },
    pages (state) {
      return state.vmSchema.pages || [];
    }
  },
  mutations,
};
