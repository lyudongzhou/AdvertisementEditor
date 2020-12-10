/**
 * 注意处理拖拽这一类的行为，vm需要实时生效，model需要按照次数来
 */
import {clone} from '../../Utils/utils';
import Vue from 'vue';
import operatorMap from './operators';
export default class SchemaManager {

  static defaultConfig = {};

  constructor(config = SchemaManager.defaultConfig) {
    this.setConfig(config);
    this.stackMap = {
      redoStack: [],
      undoStack: [],
    };
    Vue.observable(this.stackMap);
    this.redoStack = [];
    this.undoStack = [];
    this.snapshotInfo = null;
  }

  setConfig(config) {
    this.config = config;
    this.getSchema = config.getSchema;
    this.setSchema = config.setSchema;
  }

  /**
   * 提交schema并且生成redo undo
   */
  commit(operateConfig) {
    // 没有快照
    if (!this.snapshotInfo) {
      this.snapshot(operateConfig);
    }
    this.execute(operateConfig);
    this.stackMap.redoStack = [];
    this.stackMap.undoStack.push(this.snapshotInfo);
  }

  update(operateConfig) {
    const schema = this.getSchema();
    const updater = operateConfig.updater || operatorMap[operateConfig.type].updater;
    updater(schema, operateConfig);
  }

  /**
   * 更新schema, 记录变化后的值
   */
  execute(operateConfig) {
    this.update(operateConfig);
    this.snapshotInfo.to = clone(this.getSchema());
  }

  redo() {
    if (this.canRedo()) {
      const snapshotInfo = this.stackMap.redoStack.pop();
      this.updateByRedoUndo(snapshotInfo, 'redo');
      this.stackMap.undoStack.push(snapshotInfo);
    }
  }

  undo() {
    if (this.canUndo()) {
      const snapshotInfo = this.stackMap.undoStack.pop();
      this.updateByRedoUndo(snapshotInfo, 'undo');
      this.stackMap.redoStack.push(snapshotInfo);
    }
  }

  clear() {
    this.stackMap.redoStack = [];
    this.stackMap.undoStack = [];
  }

  updateByRedoUndo(snapshotInfo, type) {
    this.update({
      updater: () => {
        this.setSchema(clone(snapshotInfo[type === 'redo' ? 'to' : 'from']));
      },
    });
  }

  canRedo() {
    return !!this.stackMap.redoStack.length;
  }

  canUndo() {
    return !!this.stackMap.undoStack.length;
  }

  /**
   * 记录当前状态
   */
  snapshot(operateConfig) {
    this.snapshotInfo = this.buildSnapshot(operateConfig);
  }

  buildSnapshot(operateConfig) {
    const {type} = operateConfig;
    return {
      originType: type,
      from: clone(this.getSchema()),
    };
  }

}

const getManager = key => {
  const cache = {};
  return (state) => {
    const instance = cache[key];
    if (instance) {
      state && instance.setConfig(generateGetterSetter(key, state));
      return instance;
    }
    return (cache[key] = new SchemaManager(generateGetterSetter(key, state)));
  };
};

export const getSchemaManager = getManager('schema');
export const getVmSchemaManager = getManager('vmSchema');

export const getMergeSchemaManager = (state) => {
  const vmSchemaManager = getVmSchemaManager(state);
  const schemaManager = getSchemaManager(state);
  return {
    ...merge(vmSchemaManager, schemaManager),
    vmSchemaManager,
    schemaManager,
  };
};

const generateGetterSetter = (key, state) => ({
  getSchema: () => state[key],
  setSchema: (newSchema) => state[key] = newSchema,
});

const merge = (a, b) => {
  return {
    commit(...args) {
      a.commit(...args);
      b.commit(...args);
    },
    redo(...args) {
      a.redo(...args);
      b.redo(...args);
    },
    undo(...args) {
      a.undo(...args);
      b.undo(...args);
    },
    clear(...args) {
      a.clear(...args);
      b.clear(...args);
    }
  };
};