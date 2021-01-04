import {clone, getPropByPath, getUuid} from '../../Utils/utils';
import {mapGetters, mapState, mapMutations} from '../store/index';
import {ADD_COMPONENT, ADD_PAGE} from '../constant/schema';
import {get} from '@/register';
import {REG_COMPONENTSSCHEMA} from '@/const';

function executeGetter(name, ...args) {
  return mapGetters([name])[name].call(this, ...args);
}

function executeMutations(name, ...args) {
  return mapMutations([name])[name].call(this, ...args);
}

function getFromState(name) {
  return mapState([name])[name].call(this);
}

const getNextName = (array, prefix = '组件') => {
  const reg = new RegExp(`^${prefix}(\\d+)$`);
  let countArray = [];
  array.forEach(it => {
    const match = it.name.match(reg);
    if (match) {
      countArray.push(Number(match[1]));
    }
  });
  const {length} = countArray;
  if (!length) {
    return `${prefix}1`;
  }
  countArray.sort((a, b) => a - b);
  for (let i = 0; i < length; i++) {
    if (i + 1 !== countArray[i]) {
      return `${prefix}${i + 1}`;
    }
  }
  return `${prefix}${length + 1}`;
};

/**
 * 用于操作schema的组件逻辑复用
 * 使用混入而不是mutation，是因为mutation访问不到getter
 */
export default {
  methods: {
    $$addNewComponent(base) {
      base = clone(base);
      if (!base.layoutConfig) {
        base.layoutConfig = {

        };
      }
      base.layoutConfig = Object.assign({
        "width": 100,
        "height": 30,
        "hidden": false,
        "rotation": 0,
        "top": 0,
        "left": 0,
        "opacity":1,
        pivotX: 0,
        pivotY: 0,
        scaleX: 1,
        scaleY: 1,
        aniRotation: 0,
        skewX: 0,
        skewY: 0,
        positionX: 0,
        positionY: 0,
        alpha: 1,
    },base.layoutConfig);
      // z-index
      base.layoutConfig.zIndex = executeGetter.call(this, 'currentMaxIndex') + 1;
      // name
      const prefix = getPropByPath(get(REG_COMPONENTSSCHEMA), `${base.type}.name`);
      const components = executeGetter.call(this, 'components');
      base.name = getNextName(components, prefix);
      const component = createComponent(base);
      console.log(component);
      executeMutations.call(this, 'updateSchema', {type: ADD_COMPONENT, value: component, targetId: component.id});
    },
    $$pasteComponent(baseLayout) {
      let base = clone(getFromState.call(this, 'copyComponent'));
      if (!base) {
        return;
      }
      if (baseLayout) {
        base.layoutConfig = {...base.layoutConfig, ...baseLayout};
      }
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
    $$addPage(pageType, base = {}) {
      let container;
      let prefix;
      if (pageType === 'dialog') {
        container = executeGetter.call(this, 'dialogs');
        prefix = '弹框';
      } else {
        container = executeGetter.call(this, 'pages');
        prefix = '页面';
      }
      // name
      base.name = getNextName(container, prefix);
      const page = createPage(pageType, base);

      executeMutations.call(this, 'updateSchema', {type: ADD_PAGE, value: page, targetId: page.id});
    },
  },
};

const createComponent = (base) => {
  return {
    props: {},
    animation: [],
    events: [],
    ...base,
    id: getUuid(),
    layoutConfig: {
      ...base.layoutConfig,
      hidden: false,
      rotation: 0,
      top: 0,
      left: 0,
    },
  };
};

const createPage = (pageType, base) => {
  return {
    container: {
      backGround: {
        type: "color",
        value: "#ffffff"
      },
    },
    components: [],
    ...base,
    id: getUuid(),
  };
};
