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
  AFTER_UPDATE_COMPONENT_PROPS,
  AUTO_BEFORE_PROP,
  AUTO_UPDATING_PROP,
  AUTO_AFTER_PROP,
  UPDATE_SCHEMA,
  UPDATE_RESOLUTION,
  UPDATE_BGM_BEFORE,
  UPDATE_BGM,
  UPDATE_BGM_AFTER, BATCH_UPDATING_COMPONENT_POSITION, BATCH_AFTER_UPDATE_COMPONENT_POSITION, BATCH_ADD_COMPONENT
} from '../constant/schema';
import { setPropByPath, switchArrayIndex } from "../../Utils/utils";
import {
  COMMAND_CLEAR_CURRENT_TARGET,
  COMMAND_SELECT_COMPONENT,
  COMMAND_SELECT_CONTAINER, COMMAND_SELECT_MULTIPLE_COMPONENT,
  COMMAND_SELECT_PAGE,
  COMMAND_SELECT_SIBLING_PAGE,
  COMMAND_UPDATE_CANVAS_SIZE, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM,
  COMMAND_UPDATE_SELECT_ITEM,
} from '../constant/base';
import { getSchemaManager } from "./schemaManager";

const getPageKey = (currentPageType) =>
  currentPageType === "page" ? "pages" : "dialogs";

const getComponent = (schema, config) => {
  const page = getPage(schema, config);
  if (page) {
    const { targetId } = config;
    return (page.components || []).find(({ id }) => id === targetId);
  }
  return null;
};

const getPage = (schema, config) => {
  const { currentPageId, currentPageType } = config;
  return (
    (schema[getPageKey(currentPageType)] || []).find(
      ({ id }) => id === currentPageId
    ) || null
  );
};

// updater
const generateComponentUpdater = (targetPath) => (schema, config) => {
  const component = getComponent(schema, config);
  Object.entries(config.value).forEach(([path, value]) => {
    path = `${targetPath ? targetPath + "." : ""}${path}`;
    setPropByPath(component, path, value);
  });
};

// batch updater
const generateBatchComponentUpdater = targetPath => (schema, config) => {
  const page = getPage(schema, config);
  if (!page) {
    return;
  }
  const components = page.components || [];
  config.value.forEach(({targetId, ...rest}) => {
    const component = components.find(({id}) => id === targetId);
    Object.entries(rest).forEach(([path, value]) => {
      path = `${targetPath ? targetPath + '.' : ''}${path}`;
      setPropByPath(component, path, value);
    });
  });
};

// update page
const generatePageUpdater = (targetPath) => (schema, config) => {
  const page = getPage(schema, config);
  Object.entries(config.value).forEach(([path, value]) => {
    path = `${targetPath ? targetPath + "." : ""}${path}`;
    setPropByPath(page, path, value);
  });
};
const generateSwitchIndexUpdater = (type = "switch") => (schema, config) => {
  const currentPage = getPage(schema, config);
  const components = currentPage ? currentPage.components || [] : [];
  let newIndex;
  let oldIndex;
  if (type === "switch") {
    newIndex = config.newIndex;
    oldIndex = config.oldIndex;
  } else {
    const { targetId } = config;
    oldIndex = components.findIndex(({ id }) => id === targetId);
    if (type === "top") {
      let maxZIndex = -1;
      newIndex = -1;
      components.forEach((component, index) => {
        const zIndex = component.layoutConfig.zIndex;
        if (maxZIndex < zIndex) {
          maxZIndex = zIndex;
          newIndex = index;
        }
      });
    } else if (type === "bottom") {
      let minIndex = Infinity;
      newIndex = -1;
      components.forEach((component, index) => {
        const zIndex = component.layoutConfig.zIndex;
        if (minIndex > zIndex) {
          minIndex = zIndex;
          newIndex = index;
        }
      });
    }
  }
  doSwitchIndex(components, newIndex, oldIndex);
};

const doSwitchIndex = (components, newIndex, oldIndex) => {
  const targetLayoutConfig = components[newIndex].layoutConfig;
  const changeLayoutConfig = components[oldIndex].layoutConfig;
  const { zIndex: fromIndex } = targetLayoutConfig;
  const { zIndex: toIndex } = changeLayoutConfig;
  switchArrayIndex(components, oldIndex, newIndex);
  targetLayoutConfig.zIndex = toIndex;
  changeLayoutConfig.zIndex = fromIndex;
};
//更新背景色
const updatePageColor = generatePageUpdater("container.backGround");
//更新背景音频
const updateBgm = (schema, config) => {
  Object.entries(config.value).forEach(([path, value]) => {
    setPropByPath(schema, path, value);
  });
};

// 更新组件
const updateComponent = generateComponentUpdater("");

// 更新组件的layoutConfig
const updateComponentLayout = generateComponentUpdater("layoutConfig");

// 批量更新组件的layoutConfig
const batchUpdateComponentLayout = generateBatchComponentUpdater('layoutConfig');

// handler
const generateHandler = (fn) => (state, operateConfig) => {
  const manager = getSchemaManager(state);
  fn({ manager, state, operateConfig });
};

// 快照
const snapshotHandler = generateHandler(({ manager, operateConfig }) =>
  manager.snapshot(operateConfig)
);

// 提交操作（生成redo undo）
const commitHandler = generateHandler(({ manager, operateConfig }) =>
  manager.commit(operateConfig)
);

// 更新视图
const updateHandler = generateHandler(({ manager, operateConfig }) =>
  manager.update(operateConfig)
);

export default {
  beforeupdatePage: {
    handler: snapshotHandler,
  },
  updatingPage: {
    handler: updateHandler,
    updater: updatePageColor,
  },
  afterPage: {
    handler: commitHandler,
    updater: updatePageColor,
  },
  [UPDATE_BGM_BEFORE]: {
    handler: snapshotHandler
  },
  [UPDATE_BGM]: {
    handler: updateHandler,
    updater: updateBgm,
  },
  [UPDATE_BGM_AFTER]: {
    handler: commitHandler,
    updater: updateBgm,
  },
  [AUTO_BEFORE_PROP]: {
    handler: snapshotHandler,
  },
  [AUTO_UPDATING_PROP]: {
    handler: updateHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [AUTO_AFTER_PROP]: {
    handler: commitHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
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
  [BATCH_UPDATING_COMPONENT_POSITION]: {
    handler: updateHandler,
    updater: batchUpdateComponentLayout,
    after: [COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [BATCH_AFTER_UPDATE_COMPONENT_POSITION]: {
    handler: commitHandler,
    updater: batchUpdateComponentLayout,
    after: [COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [ADD_COMPONENT]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const page = getPage(schema, config);
      page.components.unshift(config.value);
    },
    after: [COMMAND_SELECT_COMPONENT, COMMAND_UPDATE_SELECT_ITEM],
    undoAfter: [COMMAND_SELECT_CONTAINER, COMMAND_UPDATE_SELECT_ITEM, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [BATCH_ADD_COMPONENT]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const page = getPage(schema, config);
      page.components.unshift(...config.value);
    },
    after: [COMMAND_SELECT_MULTIPLE_COMPONENT, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
    undoAfter: [COMMAND_SELECT_CONTAINER, COMMAND_UPDATE_SELECT_ITEM, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [DELETE_COMPONENT]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const page = getPage(schema, config);
      const { targetId, targetIds } = config;
      if (targetId) {
        page.components = page.components.filter(({ id }) => id !== targetId);
      } else if (targetIds) {
        page.components = page.components.filter(({ id }) => !targetIds.includes(id));
      }
    },
    after: [COMMAND_SELECT_CONTAINER, COMMAND_UPDATE_SELECT_ITEM, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [UPDATE_COMPONENT_PROPS]: {
    handler: commitHandler,
    updater: updateComponent,
    after: [COMMAND_UPDATE_SELECT_ITEM],
  },
  [ADD_PAGE]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const { currentPageType } = config;
      const key = getPageKey(currentPageType);
      schema[key].push(config.value);
    },
    after: [COMMAND_SELECT_PAGE],
    undoAfter: [COMMAND_SELECT_SIBLING_PAGE],
  },
  [DELETE_PAGE]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const { targetId, currentPageType } = config;
      const key = getPageKey(currentPageType);
      schema[key] = schema[key].filter(({ id }) => id !== targetId);
    },
    after: [COMMAND_SELECT_SIBLING_PAGE],
  },
  [SWITCH_INDEX]: {
    handler: commitHandler,
    updater: generateSwitchIndexUpdater(),
  },
  [UPDATE_INDEX_TO_TOP]: {
    handler: commitHandler,
    updater: generateSwitchIndexUpdater("top"),
  },
  [UPDATE_INDEX_TO_BOTTOM]: {
    handler: commitHandler,
    updater: generateSwitchIndexUpdater("bottom"),
  },
  [UPDATE_RESOLUTION]: {
    handler: commitHandler,
    updater: (schema, config) => {
      const { width, height } = config.value;
      schema.container.width = width;
      schema.container.height = height;
    },
    after: [COMMAND_UPDATE_CANVAS_SIZE, COMMAND_UPDATE_SELECT_ITEM, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
    undoAfter: [COMMAND_UPDATE_CANVAS_SIZE, COMMAND_UPDATE_SELECT_ITEM, COMMAND_UPDATE_MULTIPLE_SELECT_ITEM],
  },
  [UPDATE_SCHEMA]: {
    handler: commitHandler,
    updater: (schema, operateConfig, setSchema) =>
      setSchema(operateConfig.value),
    after: [COMMAND_CLEAR_CURRENT_TARGET],
  },
};
