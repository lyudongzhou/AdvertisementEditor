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
      // 触发getter，依赖收集-_-||
      state.currentComponentId;
      state.currentPageType;
      getters.currentPage;
      getters.currentDialog;
      if (state.currentComponentId && state.currentPageType) {
        const container = state.currentPageType === 'page' ? getters.currentPage : getters.currentDialog;
        return container.components.find(({ id }) => state.currentComponentId === id) || null;
      }
      return null;
    },
    pages(state) {
      return state.vmSchema.pages || [];
    },
    dialog(state) {
      return state.vmSchema.dialogs || [];
    },
    currentPage (state, getters) {
      if (getters.pages && state.currentPageId && state.currentPageType === 'page') {
        return getters.pages.find(({ id }) => state.currentPageId === id) || null;
      }
      return null
    },
    currentDialog(state, getters) {
      if (getters.dialog && state.currentPageId && state.currentPageType === 'dialog') {
        return getters.dialog.find(({ id }) => state.currentPageId === id) || null;
      }
      return null
    },
    currentMaxIndex(state, getters) {
      return Math.max(...getPropByPath(getters, 'currentPage.components', []).map(component => component.layoutConfig.zIndex)) || 0;
    }
  },
  mutations,
};
