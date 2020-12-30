<script>
  import {mapGetters, mapMutations, mapState} from '../../store';
  import draggable from 'vuedraggable';
  import {
    DELETE_COMPONENT,
    SWITCH_INDEX,
    UPDATE_COMPONENT_PROPS,
    UPDATE_INDEX_TO_BOTTOM,
    UPDATE_INDEX_TO_TOP,
  } from '../../constant/schema';
  import schemaMixin from '../../mixin/schemaMixin';
  import {getPropByPath} from '@/utils';

  export default {
    name: 'LayerManager',
    mixins: [schemaMixin],
    computed: {
      ...mapGetters(['components', 'currentComponent', 'isComponentLocked', 'components']),
      ...mapState(['currentComponentId']),
    },
    components: {
      draggable,
    },
    methods: {
      ...mapMutations(['selectComponent', 'updateSchema', 'toggleComponentLockState']),
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
      },
      toggleComponentVisibleState(componentId) {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          targetId: componentId,
          value: {
            'layoutConfig.hidden': !this.getComponentVisibleState(componentId),
          }
        });
      },
      getVisibleIconClass(componentId) {
        return this.getComponentVisibleState(componentId) ? 'el-icon-view slash' : 'el-icon-view'
      },
      getComponentVisibleState(componentId) {
        return getPropByPath(this.components.find(({id}) => id === componentId) || {}, 'layoutConfig.hidden');
      },
      getLockIconClass(componentId) {
        return this.isComponentLocked(componentId) ? 'el-icon-lock' : 'el-icon-unlock';
      },
      indexTop() {
        this.updateSchema({
          type: UPDATE_INDEX_TO_TOP,
        });
      },
      indexBottom() {
        this.updateSchema({
          type: UPDATE_INDEX_TO_BOTTOM,
        });
      },
    },
  };
</script>

<template lang="html">
  <div class="layerManager">
    <div class="operate-container">
      <el-tooltip content="置顶" placement="top">
        <div :class="['operate-btn', {disabled: !currentComponentId}]" @click="indexTop"><i class="el-icon-top"></i>置顶</div>
      </el-tooltip>

      <el-tooltip content="置底" placement="top">
        <div :class="['operate-btn', {disabled: !currentComponentId}]" @click="indexBottom"><i class="el-icon-bottom"></i>置底</div>
      </el-tooltip>

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
      >
        <i :class="getLockIconClass(component.id)" @click.stop="toggleComponentLockState({componentId: component.id})"></i>
        <i :class="getVisibleIconClass(component.id)" @click.stop="toggleComponentVisibleState(component.id)"></i>
        {{component.name}}
      </div>
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
      > i:not(:first-child) {
        margin-left: 5px;
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
          margin-right: 8px;
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
    .slash {
      position: relative;
      &::after {
        content: '\\';
        display: inline-block;
        position: absolute;
        transform: rotate(80deg);
        left: 5px;
      }
    }
  }
</style>
