import mutations from './mutations';
import {getPropByPath} from '../../Utils/utils';

export default {
  namespaced: true,
  state() {
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
    currentComponent(state, getters) {
      if (state.currentComponentId && state.currentPageType) {
        return getters.currentContainer.components.find(({id}) => state.currentComponentId === id) || null;
      }
      return null;
    },
    pages(state) {
      return state.vmSchema.pages || [];
    },
    dialog(state) {
      return state.vmSchema.dialogs || [];
    },
    currentPage(state, getters) {
      if (getters.pages && state.currentPageId && state.currentPageType === 'page') {
        return getters.pages.find(({id}) => state.currentPageId === id) || null;
      }
      return null;
    },
    currentDialog(state, getters) {
      if (getters.dialog && state.currentPageId && state.currentPageType === 'dialog') {
        return getters.dialog.find(({id}) => state.currentPageId === id) || null;
      }
      return null;
    },
    currentContainer(state, getters) {
      // 触发getter，依赖收集-_-||
      const containerMap = {
        page: getters.currentPage,
        dialog: getters.currentDialog,
      };
      return containerMap[state.currentPageType];
    },
    currentMaxIndex(state, getters) {
      return Math.max(...getPropByPath(getters, 'currentContainer.components', []).map(component => component.layoutConfig.zIndex)) || 0;
    },
  },
  mutations,
};
