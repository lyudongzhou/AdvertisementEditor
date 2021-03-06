/**
 * 注意处理拖拽这一类的行为，vm需要实时生效，model需要按照次数来
 */
import {clone} from '../../Utils/utils';
import Vue from 'vue';
import operatorMap from './operators';

let instance;

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
    this.snapshotInfo = null;
  }

  update(operateConfig) {
    const schema = this.getSchema();
    const updater = operateConfig.updater || operatorMap[operateConfig.type].updater;
    updater(schema, operateConfig, this.setSchema);
  }

  /**
   * 更新schema, 记录变化后的值
   */
  execute(operateConfig) {
    this.update(operateConfig);
    this.snapshotInfo.to = clone(this.getSchema());
    this.lastOperate = operateConfig;
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
      return this.lastOperate;
    }
  }

  clear() {
    this.stackMap.redoStack = [];
    this.stackMap.undoStack = [];
    this.lastOperate = null;
  }

  updateByRedoUndo(snapshotInfo, type) {
    this.update({
      updater: () => {
        this.setSchema(clone(snapshotInfo[type === 'redo' ? 'to' : 'from']));
      },
    });
    this.lastOperate = snapshotInfo.operateConfig;
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
    return {
      operateConfig,
      from: clone(this.getSchema()),
    };
  }

}

export const getSchemaManager = (state) => {
  if (instance) {
    state && instance.setConfig(generateGetterSetter(state));
    return instance;
  }
  return (instance = new SchemaManager(generateGetterSetter(state)));
};

const generateGetterSetter = (state) => ({
  getSchema: () => state.schema,
  setSchema: (newSchema) => state.schema = newSchema,
});
