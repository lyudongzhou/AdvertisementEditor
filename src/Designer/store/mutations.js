import {clone, getPropByPath} from '../../Utils/utils';
import { getSchemaManager } from '../manager/schemaManager';
import { eventBus } from '../plugin/event';
import { UPDATE_SELECT_INFO } from '../constant/event';
import operatorMap from '../manager/operators';
import {
  COMMAND_UPDATE_SELECT_ITEM,
  COMMAND_SELECT_COMPONENT,
  COMMAND_SELECT_CONTAINER,
  COMMAND_SELECT_PAGE,
  COMMAND_SELECT_SIBLING_PAGE,
  COMMAND_CLEAR_CURRENT_TARGET,
} from '../constant/base';

const afterCommandMap = {
  /**
   * 更新选中框
   */
  [COMMAND_UPDATE_SELECT_ITEM]() {
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  /**
   * focus组件
   *
   * @param state
   * @param operateConfig
   */
  [COMMAND_SELECT_COMPONENT](state, operateConfig) {
    state.currentComponentId = operateConfig.targetId;
    state.currentType = 'component';
  },
  /**
   * focus当前容器(page/dialog)
   */
  [COMMAND_SELECT_CONTAINER](state) {
    state.currentType = state.currentPageType;
    state.currentComponentId = null;
  },
  /**
   * focus容器(page/dialog)
   * @param state
   * @param operateConfig
   */
  [COMMAND_SELECT_PAGE](state, operateConfig) {
    state.currentPageId = operateConfig.targetId;
    state.currentType = operateConfig.currentType;
    state.currentPageType = state.currentType;
  },
  [COMMAND_CLEAR_CURRENT_TARGET](state) {
    state.currentComponentId = null;
  },
  /**
   * 选择兄弟容器
   *
   * @param state
   * @param operateConfig
   */
  [COMMAND_SELECT_SIBLING_PAGE](state, operateConfig) {
    const {currentPageType} = operateConfig;
    state.currentPageType = currentPageType;
    state.currentType = currentPageType;
    state.currentPageId = getPropByPath(state.schema, `${currentPageType === 'page' ? 'pages' : 'dialogs'}[0].id`, null);
  },
};

export default {
  resetSchema (state, schema) {
    state.schema = clone(schema);
    state.currentPageId = getPropByPath(schema, 'pages[0].id', null);
    state.currentPageType = 'page';
    state.currentType = 'page';
    // state.currentComponent = state.currentPage.components[0];
    // state.currentComponentId = state.currentComponent.id;
    state.opened = true;
    // 清空之前的记录
    getSchemaManager(state).clear();
    state.lockState = {};
  },
  selectComponent (state, componentId) {
    state.currentComponentId = componentId;
    state.currentType = 'component';
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  selectPage (state, {id, currentPageType}) {
    if (id !== state.currentPageId) {
      // 切换页面重置redo undo
      getSchemaManager(state).clear();
    }
    state.currentPageId = id;
    state.currentPageType = currentPageType;
    state.currentType = currentPageType;
    state.currentComponentId = null;
  },
  updateSchema (state, operateConfig) {
    if (!operateConfig.currentPageType) {
      operateConfig.currentPageType = state.currentPageType;
    }
    if (!operateConfig.currentType) {
      operateConfig.currentType = state.currentType;
    }
    if (!operateConfig.currentPageId) {
      operateConfig.currentPageId = state.currentPageId;
    }
    if (!operateConfig.targetId) {
      operateConfig.targetId = state.currentComponentId;
    }
    const {handler, after = []} = operatorMap[operateConfig.type];

    // 执行操作
    handler(state, operateConfig);

    // 后处理器
    after.forEach(command => {
      afterCommandMap[command](state, operateConfig);
    })
  },
  redo (state) {
    const manager = getSchemaManager(state);
    manager.redo();
    afterCommandMap[COMMAND_UPDATE_SELECT_ITEM]();
  },
  undo (state) {
    const manager = getSchemaManager(state);
    manager.undo();
    afterCommandMap[COMMAND_UPDATE_SELECT_ITEM]();
  },
  copyComponent(state, copyComponent) {
    state.copyComponent = copyComponent;
  },
  /**
   * @description: 打开或者关闭单页预览需要先设置total再设置previewing
   * @param {*} state store state
   * @param {Boolean} para open or close
   * @return {undefined}
   */
  setPreviewState(state,{previewTotal = false,previewing}){
    state.previewTotal = previewTotal;
    state.previewing = previewing;
  },
  toggleComponentLockState(state, {componentId}) {
    const locked = getPropByPath(state.lockState, `${state.currentPageId}.${componentId}`);
    if (!state.lockState[state.currentPageId]) {
      state.lockState[state.currentPageId] = {};
    }
    state.lockState[state.currentPageId][componentId] = !locked;
    state.lockState = {...state.lockState};
  },
  setProjectId(state, id) {
    state.projectId = id;
  }
};
