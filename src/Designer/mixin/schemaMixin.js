import {clone, getUuid} from '../../Utils/utils';
import {mapGetters, mapState, mapMutations} from '../store/index';
import {ADD_COMPONENT} from '../constant/schema';

function executeGetter(name, ...args) {
  return mapGetters([name])[name].call(this, ...args);
}

function executeMutations(name, ...args) {
  return mapMutations([name])[name].call(this, ...args);
}

function getFromState(name) {
  return mapState([name])[name].call(this);
}


/**
 * 用于操作schema的组件逻辑复用
 * 使用混入而不是mutation，是因为mutation访问不到getter
 */
export default {
  methods: {
    $$addNewComponent(base) {
      if (!base.layoutConfig) {
        base.layoutConfig = {};
        base.layoutConfig.zIndex = executeGetter.call(this, 'currentPageMaxIndex') + 1;
      }
      if (!base.layoutConfig.height || !base.layoutConfig.width) {
        // todo 找组件协议，初始化组件的高宽
        base.layoutConfig.height = 100;
        base.layoutConfig.width = 100;
      }
      // todo 初始化props
      const component = createComponent(base);
      executeMutations.call(this, 'updateSchema', {type: ADD_COMPONENT, value: component});
    },
    $$pasteComponent() {
      const base = clone(getFromState.call(this, 'copyComponent'));
      this.$$addNewComponent(base);
    },
    $$copyComponent() {
      const component = executeGetter.call(this, 'currentComponent');
      if (!component) {
        // todo error
        return;
      }
      executeMutations.call(this, 'copyComponent', clone(component));
    },
    // $$addPage(pageType, options) {
    //
    // }
  }
}

const createComponent = (base) => {
  return {
    props: {
    },
    animation: [],
    events: [
    ],
    ...base,
    id: getUuid(),
    layoutConfig: {
      top: 0,
      left: 0,
      ...base.layoutConfig,
    },
  };
};
