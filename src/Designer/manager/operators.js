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

  BEFORE_UPDATE_COMPONENT_PROPS,
  UPDATING_COMPONENT_PROPS,
  AFTER_UPDATE_COMPONENT_PROPS
} from '../constant/schema';
import { setPropByPath } from '../../Utils/utils';
import {
  COMMAND_SELECT_COMPONENT,
  COMMAND_SELECT_CONTAINER,
  COMMAND_SELECT_PAGE,
  COMMAND_SELECT_SIBLING_PAGE,
  COMMAND_UPDATE_SELECT_ITEM,
} from '../constant/base';
import {getMergeSchemaManager} from './schemaManager';

const getComponent = (schema, config) => {
  const page = getPage(schema, config);
  if (page) {
    const { targetId } = config;
    return (page.components || []).find(({ id }) => id === targetId);
  }
  return null;
};

const getPage = (schema, config) => {
  const {currentPageId, currentPageType} = config;
  return (schema[currentPageType === 'page' ? 'pages' : 'dialogs'] || []).find(({id}) => id === currentPageId) || null;
};

// updater
const generateComponentUpdater = targetPath => (schema, config) => {
  const component = getComponent(schema, config);
  Object.entries(config.value).forEach(([path, value]) => {
    path = `${targetPath ? targetPath + '.' : ''}${path}`;
    setPropByPath(component, path, value);
  });
};

// 更新组件
const updateComponent = generateComponentUpdater('');

// 更新组件的layoutConfig
const updateComponentLayout = generateComponentUpdater('layoutConfig');

// handler
const generateHandler = (fn) => (state, operateConfig) => {
  const manager = getMergeSchemaManager(state);
  const { schemaManager, vmSchemaManager } = manager;
  fn({manager, schemaManager, vmSchemaManager, state, operateConfig});
};

// 快照
const snapshotHandler = generateHandler(({vmSchemaManager, operateConfig}) => vmSchemaManager.snapshot(operateConfig));

// 提交操作（生成redo undo）
const commitHandler = generateHandler(({manager, operateConfig}) => manager.commit(operateConfig));

// 更新视图
const updateHandler = generateHandler(({vmSchemaManager, operateConfig}) => vmSchemaManager.update(operateConfig));

export default {
  [BEFORE_UPDATE_COMPONENT_PROPS]: {
    handler: snapshotHandler,
  },
  [UPDATING_COMPONENT_PROPS]: {
    handler: updateHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [AFTER_UPDATE_COMPONENT_PROPS]: {
    handler: commitHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [BEFORE_UPDATE_COMPONENT_SIZE]: {
    handler: snapshotHandler,
  },
  [UPDATING_COMPONENT_SIZE]: {
    handler: updateHandler,
    updater: updateComponentLayout,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [AFTER_UPDATE_COMPONENT_SIZE]: {
    handler: commitHandler,
    updater: updateComponentLayout,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [BEFORE_UPDATE_COMPONENT_POSITION]: {
    handler: snapshotHandler,
  },
  [UPDATING_COMPONENT_POSITION]: {
    handler: updateHandler,
    updater: updateComponentLayout,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [AFTER_UPDATE_COMPONENT_POSITION]: {
    handler: commitHandler,
    updater: updateComponentLayout,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [ADD_COMPONENT]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const page = getPage(schema, config);
      page.components.push(config.value);
    },
    after: [COMMAND_SELECT_COMPONENT, COMMAND_UPDATE_SELECT_ITEM],
  },
  [DELETE_COMPONENT]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const page = getPage(schema, config);
      const { targetId } = config;
      page.components = page.components.filter(({ id }) => id !== targetId);
    },
    after: [COMMAND_SELECT_CONTAINER, COMMAND_UPDATE_SELECT_ITEM],
  },
  [UPDATE_COMPONENT_PROPS]: {
    handler: commitHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [ADD_PAGE]: {
    handler: commitHandler,
    updater: (schema, config) => {
      schema.pages.push(config.value);
    },
    after: [COMMAND_SELECT_PAGE],
  },
  [DELETE_PAGE]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const { targetId } = config;
      schema.pages = schema.pages.filter(({ id }) => id !== targetId);
    },
    after: [COMMAND_SELECT_SIBLING_PAGE],
  },
  [SWITCH_INDEX]: {},
  [UPDATE_INDEX_TO_TOP]: {},
  [UPDATE_INDEX_TO_BOTTOM]: {},
};