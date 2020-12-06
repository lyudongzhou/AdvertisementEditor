<script>
  import {mapGetters, mapMutations, mapState} from '../../store';
  import draggable from 'vuedraggable';
  import {DELETE_COMPONENT, SWITCH_INDEX} from '../../constant/schema';
  import schemaMixin from '../../mixin/schemaMixin';

  export default {
    name: 'LayerManager',
    mixins: [schemaMixin],
    computed: {
      ...mapGetters(['components', 'currentComponent']),
      ...mapState(['currentComponentId']),
    },
    components: {
      draggable,
    },
    methods: {
      ...mapMutations(['selectComponent', 'updateSchema']),
      handleComponentClick(componentId) {
        this.selectComponent(componentId);
      },
      handleOrderChange({moved}) {
        this.updateSchema({
          type: SWITCH_INDEX,
          newIndex: moved.newIndex,
          oldIndex: moved.oldIndex,
        });
      },
      remove() {
        if (!this.currentComponentId) {
          return;
        }
        this.updateSchema({
          type: DELETE_COMPONENT,
        });
      },
      copy() {
        if (!this.currentComponentId) {
          return;
        }
        this.$$addNewComponent(this.currentComponent)
      }
    },
  };
</script>

<template lang="html">
  <div class="layerManager">
    <div class="operate-container">
      <el-tooltip content="复制" placement="top">
        <div :class="['operate-btn', {disabled: !currentComponentId}]" @click="copy"><i class="el-icon-document-copy"></i>复制</div>
      </el-tooltip>

      <el-tooltip content="删除" placement="top">
        <div :class="['operate-btn', {disabled: !currentComponentId}]" @click="remove"><i class="el-icon-delete"></i>删除</div>
      </el-tooltip>
    </div>
    <draggable :value="components" @change="handleOrderChange">
      <div
        v-for="component in components"
        :class="['component-item', {activate: component.id === currentComponentId}]"
        :key="component.id"
        @click="handleComponentClick(component.id)"
      >{{component.name}}</div>
    </draggable>

  </div>
</template>

<style lang="less" scoped>
  .layerManager {
    padding: 10px;

    .component-item {
      padding: 0 10px;
      cursor: pointer;
      /*margin-left: 25px;*/
      line-height: 36px;
      color: #fff;
      background-color: #5c5c5d;
      opacity: .7;
      &:not(:first-child) {
        /*border-top:  1px solid #000;*/
        margin-top: 3px;
      }
      &:hover,
      &.activate {
        opacity: 1;
      }
    }

    .operate-container {
      text-align: center;
      margin-bottom: 10px;

      .operate-btn {
        > i {
          margin-right: 5px;
        }
        &:not(:last-child) {
          margin-right: 10px;
        }
        display: inline-block;
        cursor: pointer;
        line-height: 32px;
        color: #fff;
        background-color: #5c5c5d;
        opacity: .7;
        padding: 0 5px;
        &:hover {
          opacity: 1;
        }
        &.disabled {
          opacity: .3;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
