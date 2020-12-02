import {clone, getPropByPath} from '../../Utils/utils';
import { getMergeSchemaManager } from '../manager/schemaManager';
import { eventBus } from '../plugin/event';
import { UPDATE_SELECT_INFO } from '../constant/event';
import operatorMap from '../manager/operators';
import {
  COMMAND_UPDATE_SELECT_ITEM,
  COMMAND_SELECT_COMPONENT,
  COMMAND_SELECT_CONTAINER,
  COMMAND_SELECT_PAGE,
  COMMAND_SELECT_SIBLING_PAGE,
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
    state.currentPageId = getPropByPath(state.vmSchema, `${currentPageType === 'page' ? 'pages' : 'dialogs'}[0].id`, null);
  },
};

export default {
  resetSchema (state, schema) {
    state.schema = clone(schema);
    state.vmSchema = clone(schema);
    state.currentPageId = getPropByPath(schema, 'pages[0].id', null);
    state.currentPageType = 'page';
    state.currentType = 'page';
    // state.currentComponent = state.currentPage.components[0];
    // state.currentComponentId = state.currentComponent.id;
    state.opened = true;
  },
  selectComponent (state, componentId) {
    state.currentComponentId = componentId;
    state.currentType = 'component';
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  selectPage (state, pageId, pageType, type) {
    state.currentPageId = pageId;
    state.currentPageType = pageType;
    state.currentType = type;
  },
  // 切换render展示页面调用
  switchPage (state, page) {
    // todo state上不需要currentPage，修改currentPageId即可
    state.currentPageId = page;
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
    const manager = getMergeSchemaManager(state);
    manager.redo();
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  undo (state) {
    const manager = getMergeSchemaManager(state);
    manager.undo();
    eventBus.emit(UPDATE_SELECT_INFO);
  },
  copyComponent(state, copyComponent) {
    state.copyComponent = copyComponent;
  }
};
