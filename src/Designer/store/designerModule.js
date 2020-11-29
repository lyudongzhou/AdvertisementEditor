import mutations from './mutations';
import {getPropByPath} from '../../Utils/utils';

export default {
  namespaced: true,
  state () {
    return {
      schema: {},
      vmSchema: {},
      currentComponentId: null,
      opened: false,
      // 当前选中对象的类型： component、page、dialog
      currentType: '',
      // 当前选中对象所属页面的类型： page、dialog
      currentPageType: '',
      // 复制的组件
      copyComponent: null,
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
    },
    currentPageMaxIndex(state, getters) {
      return Math.max(...getPropByPath(getters, 'currentPage.components', []).map(component => component.layoutConfig.zIndex)) || 0;
    }
  },
  mutations,
};
