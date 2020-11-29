import mutations from './mutations';

export default {
  namespaced: true,
  state () {
    return {
      schema: {},
      vmSchema: {},
      currentComponentId: 0,
      currentIndex: 1,
      opened: false,
      // 当前选中对象的类型： component、page、dialog
      currentType: '',
      // 当前选中页面的类型： page、dialog
      currentPageType: '',
    };
  },
  getters: {
    currentComponent (state, getters) {
      if (getters.currentPage && state.currentComponentId) {
        return getters.currentPage.components.find(({ id }) => state.currentComponentId === id) || null;
      }
      return null;
    },
    currentPage (state, getters) {
      if (getters.pages && state.currentPageId) {
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
