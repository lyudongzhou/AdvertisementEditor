import {clone, getPropByPath} from '../../Utils/utils';
import { getSchemaManager } from '../manager/schemaManager';
import { eventBus } from '../plugin/event';
import {UPDATE_CANVAS_SIZE, UPDATE_MULTIPLE_SELECT_INFO, UPDATE_SELECT_INFO} from '../constant/event';
import operatorMap from '../manager/operators';
import {
  COMMAND_UPDATE_SELECT_ITEM,
  COMMAND_SELECT_COMPONENT,
  COMMAND_SELECT_CONTAINER,
  COMMAND_SELECT_PAGE,
  COMMAND_SELECT_SIBLING_PAGE,
  COMMAND_CLEAR_CURRENT_TARGET, COMMAND_UPDATE_CANVAS_SIZE, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM,
  COMMAND_SELECT_MULTIPLE_COMPONENT,
} from '../constant/base';

const afterCommandMap = {
  /**
   * 更新选中框
   */
  [COMMAND_UPDATE_SELECT_ITEM]() {
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  /**
   * 更新多个选中框（多选情况下）
   */
  [COMMAND_UPDATE_MULTIPLE_SELECT_ITEM]() {
    eventBus.emit(UPDATE_MULTIPLE_SELECT_INFO);
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
    state.selectedComponents = [];
  },
  /**
   * focus 多个组件
   *
   * @param state
   * @param operateConfig
   */
  [COMMAND_SELECT_MULTIPLE_COMPONENT](state, operateConfig) {
    state.currentComponentId = null;
    state.currentType = 'component';
    state.selectedComponents = operateConfig.targetIds;
  },
  /**
   * focus当前容器(page/dialog)
   */
  [COMMAND_SELECT_CONTAINER](state) {
    state.currentType = state.currentPageType;
    state.currentComponentId = null;
    state.selectedComponents = [];
  },
  /**
   * focus容器(page/dialog)
   * @param state
   * @param operateConfig
   */
  [COMMAND_SELECT_PAGE](state, operateConfig) {
    state.currentPageId = operateConfig.targetId;
    state.currentType = operateConfig.currentPageType;
    state.currentPageType = operateConfig.currentPageType;
    state.currentComponentId = null;
    state.selectedComponents = [];
  },
  [COMMAND_CLEAR_CURRENT_TARGET](state) {
    state.currentComponentId = null;
    state.selectedComponents = [];
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
    state.selectedComponents = [];
  },
  /**
   * 修改画布大小
   */
  [COMMAND_UPDATE_CANVAS_SIZE]() {
    eventBus.emit(UPDATE_CANVAS_SIZE);
  }
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
    state.selectedComponents = [];
  },
  selectComponent (state, componentId) {
    state.currentComponentId = componentId;
    state.currentType = 'component';
    state.selectedComponents = [];
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  updateSelectedComponents(state, selectedComponents) {
    state.selectedComponents = selectedComponents;
  },
  selectMultipleComponent(state, componentId) {
    const originSelectedComponents = state.selectedComponents;
    if (originSelectedComponents.length === 0) {
      if (state.currentComponentId) {
        if (state.currentComponentId !== componentId) {
          // 已有选中，加入多选中
          state.selectedComponents = [state.currentComponentId, componentId];
          state.currentComponentId = null;
        } else {
          // 取消选择
          state.currentComponentId = null;
          state.currentType = state.currentPageType;
        }
      } else {
        // 没有选中，选中一个
        state.currentComponentId = componentId;
        state.currentType = 'component';
        eventBus.emit(UPDATE_SELECT_INFO);
      }
    } else if (originSelectedComponents.length > 0) {
      let selectedComponents;
      if (originSelectedComponents.includes(componentId)) {
        // remove
        selectedComponents = originSelectedComponents.filter(id => id !== componentId);
        // 只剩一个的情况，切换为currentComponentId
        if (selectedComponents.length === 1) {
          state.currentComponentId = selectedComponents[0];
          state.currentType = 'component';
          selectedComponents = [];
          state.selectedComponents = selectedComponents;
          eventBus.emit(UPDATE_SELECT_INFO);
        } else {
          state.selectedComponents = selectedComponents;
        }
      } else {
        // add
        selectedComponents = [...originSelectedComponents, componentId];
        state.selectedComponents = selectedComponents;
      }
    }
    if (originSelectedComponents.length !== state.selectedComponents.length) {
      eventBus.emit(UPDATE_MULTIPLE_SELECT_INFO);
    }
  },
  selectCurrentPage(state) {
    state.currentType = state.currentPageType;
    state.currentComponentId = null;
    state.selectedComponents = [];
  },
  selectPage (state, {id, currentPageType}) {
    if (id !== state.currentPageId) {
      // 切换页面重置redo undo
      getSchemaManager(state).clear();
      state.selectedComponents = [];
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
    if (!operateConfig.targetIds && state.selectedComponents.length) {
      operateConfig.targetIds = state.selectedComponents;
    }
    const {handler, after = []} = operatorMap[operateConfig.type];

    // 执行操作
    handler(state, operateConfig);

    // 后处理器
    after.forEach(command => {
      afterCommandMap[command](state, operateConfig);
    })
  },
  pressShift(state,isPress){
    state.shiftKey = isPress;
  },
  redo (state) {
    const manager = getSchemaManager(state);
    manager.redo();
    afterCommandMap[COMMAND_UPDATE_SELECT_ITEM]();
  },
  undo (state) {
    const manager = getSchemaManager(state);
    const lastOperate = manager.undo();
    if (lastOperate) {
      const type = lastOperate.type;
      if (operatorMap[type] && operatorMap[type].undoAfter) {
        operatorMap[type].undoAfter.forEach(command => {
          afterCommandMap[command](state, lastOperate);
        });
      } else {
        afterCommandMap[COMMAND_UPDATE_SELECT_ITEM]();
        afterCommandMap[COMMAND_UPDATE_MULTIPLE_SELECT_ITEM]();
      }
    } else {
      afterCommandMap[COMMAND_UPDATE_SELECT_ITEM]();
      afterCommandMap[COMMAND_UPDATE_MULTIPLE_SELECT_ITEM]();
    }
  },
  copyComponents(state, copyComponents) {
    state.copyComponents = copyComponents;
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
  setProgramInfo(state, projectInfo) {
    state.projectInfo = projectInfo;
  },
  showProgramConfig(state){
    state.isShowProgram = true;
  },
  hideProgramConfig(state){
    state.isShowProgram = false;

  }
};
