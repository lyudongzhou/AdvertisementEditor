import {clone} from '../../Utils/utils';
import {UPDATE_COMPONENT_SIZE} from '../constant/schema';

export default {
  resetSchema(state, schema) {
    state.schema = schema;
    state.vmSchema = clone(schema);
    state.currentPage = schema.pages[0];
    // state.currentComponent = state.currentPage.components[0];
    // state.currentComponentId = state.currentComponent.id;
    state.pages = schema.pages;
    state.opened = true;
  },
  selectComponent(state, componentInfo) {
    state.currentComponentId = componentInfo.id;
    state.currentComponentInfo = componentInfo;
  },
  updateSchema(state, type, arg, commit = true) {
    console.info(state, type, arg, commit);
    switch (type) {
      case UPDATE_COMPONENT_SIZE:

    }
  },
};


// 对协议的修改 新增页面、新增组件、删除页面、删除组件、修改组件属性