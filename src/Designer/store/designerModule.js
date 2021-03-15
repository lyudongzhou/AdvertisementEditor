/*
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:13:50
 * @LastEditTime: 2020-12-21 02:13:00
 * @Description: file content
 */
import mutations from './mutations';
import { getPropByPath } from '../../Utils/utils';
import {DEFAULT_GRID_GUIDE_OFFSET} from '../constant/base';

export default {
  namespaced: true,
  state() {
    return {
      programInfo:{
        programName:"",
        coverUrl:"",
        description:""
      },
      currentComponentOperator:null,
      schema: {},
      currentComponentId: null,
      opened: false,
      // 当前选中对象的类型： component、page、dialog
      currentType: '',
      // 当前选中对象所属页面的类型： page、dialog
      currentPageType: '',
      // 复制的组件
      copyComponents: null,
      // 当前选中页面/弹框id
      currentPageId: null,
      previewTotal:false,
      /**
       * @description: 单页预览
       */
      previewing: false,
      lockState: {},
      isShowProgram:false,
      projectInfo: {
        id: null,
        name: '节目',
        description: '',
      },
      selectedComponents: [],
      shiftKey:false,
    };
  },
  getters: {
    currentComponent(state, getters) {
      return getters.getComponentSchema(state.currentComponentId);
    },
    getComponentSchema(state, getters) {
      return componentId => {
        if (componentId && state.currentPageType) {
          return getters.components.find(({ id }) => componentId === id) || null;
        }
        return null;
      }
    },
    isComponentLocked(state) {
      return componentId => {
        if (componentId && state.lockState) {
          return getPropByPath(state.lockState, `${state.currentPageId}.${componentId}`)
        }
      }
    },
    components(state, getters) {
      return getters.currentContainer.components || [];
    },
    pages(state) {
      return state.schema.pages || [];
    },
    dialogs(state) {
      return state.schema.dialogs || [];
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
      return containerMap[state.currentPageType] || {};
    },
    currentMaxIndex(state, getters) {
      return Math.max(...getPropByPath(getters, 'currentContainer.components', []).map(component => component.layoutConfig.zIndex)) || 0;
    },
    gridGuideHozSet(state) {
      const height = getPropByPath(state.schema || {}, 'container.height', 0);
      return Array.from(new Array(Math.ceil(height / DEFAULT_GRID_GUIDE_OFFSET)), (_, i) => i * DEFAULT_GRID_GUIDE_OFFSET);
    },
    gridGuideVerSet(state) {
      const width = getPropByPath(state.schema || {}, 'container.width', 0);
      return Array.from(new Array(Math.ceil(width / DEFAULT_GRID_GUIDE_OFFSET)), (_, i) => i * DEFAULT_GRID_GUIDE_OFFSET);
    },
    isSelectMultipleComponent(state) {
      return !!state.selectedComponents.length;
    }
  },
  mutations,
};
