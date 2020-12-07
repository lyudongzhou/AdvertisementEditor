/*
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:13:50
 * @LastEditTime: 2020-12-07 02:01:07
 * @Description: file content
 */
import mutations from './mutations';
import { getPropByPath } from '../../Utils/utils';

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
      // 当前选中页面/弹框id
      currentPageId: null,
      /**
       * @description: 单页预览
       */
      previewing: false
    };
  },
  getters: {
    currentComponent(state, getters) {
      if (state.currentComponentId && state.currentPageType) {
        return getters.currentContainer.components.find(({ id }) => state.currentComponentId === id) || null;
      }
      return null;
    },
    pages(state) {
      return state.vmSchema.pages || [];
    },
    dialogs(state) {
      return state.vmSchema.dialogs || [];
    },
    currentPage(state, getters) {
      // todo 依赖可能没有收集到
      if (getters.pages && state.currentPageId && state.currentPageType === 'page') {
        return getters.pages.find(({ id }) => state.currentPageId === id) || null;
      }
      return null;
    },
    currentDialog(state, getters) {
      // todo 依赖可能没有收集到
      if (getters.dialogs && state.currentPageId && state.currentPageType === 'dialog') {
        return getters.dialogs.find(({ id }) => state.currentPageId === id) || null;
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
