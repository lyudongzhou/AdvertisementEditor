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
  return (schema[currentPageType === 'page' ? 'pages' : 'dialogs'] || []).find(({ id }) => id === currentPageId) || null;
};

const generateComponentUpdater = targetPath => (schema, config) => {
  const component = getComponent(schema, config);
  Object.entries(config.value).forEach(([path, value]) => {
    path = `${targetPath ? targetPath + '.' : ''}${path}`;
    setPropByPath(component, path, value);
  });
};

const updateComponent = generateComponentUpdater('');

const updateComponentLayout = generateComponentUpdater('layoutConfig');

export default {
  [BEFORE_UPDATE_COMPONENT_PROPS]: {

  },
  [UPDATING_COMPONENT_PROPS]: {
    updater: updateComponent
  },
  [AFTER_UPDATE_COMPONENT_PROPS]: {
    updater: updateComponent
  },
  [BEFORE_UPDATE_COMPONENT_SIZE]: {
  },
  [UPDATING_COMPONENT_SIZE]: {
    updater: updateComponentLayout,
  },
  [AFTER_UPDATE_COMPONENT_SIZE]: {
    updater: updateComponentLayout,
  },

  [BEFORE_UPDATE_COMPONENT_POSITION]: {},
  [UPDATING_COMPONENT_POSITION]: {
    updater: updateComponentLayout,
  },
  [AFTER_UPDATE_COMPONENT_POSITION]: {
    updater: updateComponentLayout,
  },

  [ADD_COMPONENT]: {
    updater: (schema, config) => {
      const page = getPage(schema, config);
      page.components.push(config.value);
    },
  },
  [DELETE_COMPONENT]: {
    updater: (schema, config) => {
      const page = getPage(schema, config);
      const { targetId } = config;
      page.components = page.components.filter(({ id }) => id !== targetId);
    },
  },
  [UPDATE_COMPONENT_PROPS]: {
    updater: updateComponent,
  },
  [ADD_PAGE]: {
    updater: (schema, config) => {
      schema.pages.push(config.value);
    },
  },
  [DELETE_PAGE]: {
    updater: (schema, config) => {
      const { targetId } = config;
      schema.pages = schema.pages.filter(({ id }) => id !== targetId);
    },
  },
  [SWITCH_INDEX]: {},
  [UPDATE_INDEX_TO_TOP]: {},
  [UPDATE_INDEX_TO_BOTTOM]: {},
};