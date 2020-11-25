import {clone, getPropByPath} from '../../Utils/utils';
import {
  BEFORE_UPDATE_COMPONENT_SIZE,
  UPDATING_COMPONENT_SIZE,
  AFTER_UPDATE_COMPONENT_SIZE,

  BEFORE_UPDATE_COMPONENT_POSITION,
  UPDATING_COMPONENT_POSITION,
  AFTER_UPDATE_COMPONENT_POSITION,

  ADD_COMPONENT,
  DELETE_COMPONENT,
  UPDATE_COMPONENT_PROPS,

  ADD_PAGE,
  DELETE_PAGE,

  SWITCH_INDEX,
  UPDATE_INDEX_TO_TOP,
  UPDATE_INDEX_TO_BOTTOM,
} from '../constant/schema';
import {getMergeSchemaManager} from '../manager/schemaManager';


export default {
  resetSchema(state, schema) {
    state.schema = clone(schema);
    state.vmSchema = clone(schema);
    state.currentPageId = getPropByPath(schema, 'pages[0].id', null);
    // state.currentComponent = state.currentPage.components[0];
    // state.currentComponentId = state.currentComponent.id;
    state.pages = state.vmSchema.pages || [];
    state.opened = true;
  },
  selectComponent(state, componentId) {
    state.currentComponentId = componentId;
  },
  selectPage(state, pageId) {
    state.currentPageId = pageId;
  },
  updateSchema(state, operateConfig) {
    if (!operateConfig.currentPageId) {
      operateConfig.currentPageId = state.currentPageId;
    }
    if (!operateConfig.targetId) {
      operateConfig.targetId = state.currentComponentId;
    }
    const manager = getMergeSchemaManager(state);
    const {schemaManager, vmSchemaManager} = manager;
    switch (operateConfig.type) {
      case BEFORE_UPDATE_COMPONENT_SIZE:
      case BEFORE_UPDATE_COMPONENT_POSITION:
        vmSchemaManager.snapshot(operateConfig);
        break;
      case AFTER_UPDATE_COMPONENT_SIZE:
      case AFTER_UPDATE_COMPONENT_POSITION:
        schemaManager.commit(operateConfig);
        vmSchemaManager.commit(operateConfig);
        break;
      case UPDATING_COMPONENT_SIZE:
      case UPDATING_COMPONENT_POSITION:
        vmSchemaManager.update(operateConfig);
        break;

      case ADD_COMPONENT:
      case DELETE_COMPONENT:
      case UPDATE_COMPONENT_PROPS:
      case ADD_PAGE:
      case DELETE_PAGE:
        manager.commit(operateConfig);
        break;

      case SWITCH_INDEX:
      case UPDATE_INDEX_TO_TOP:
      case UPDATE_INDEX_TO_BOTTOM:
        break;
    }


  },
  redo(state) {
    const manager = getMergeSchemaManager(state);
    manager.redo();
  },
  undo(state) {
    const manager = getMergeSchemaManager(state);
    manager.undo();
  },
};


// 对协议的修改 新增页面、新增组件、删除页面、删除组件、修改组件属性
