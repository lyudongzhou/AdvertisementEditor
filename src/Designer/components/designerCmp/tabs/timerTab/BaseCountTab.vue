<template>
  <div class="basic_tab">
    <el-form ref="form" class="full-width" size="mini" label-position="left">

      <el-form-item :label="dateLabel">
        <el-date-picker
            :style="{width: '100%'}"
            @input="handleInput"
            :value="date"
            type="datetime"
            @focus="handleFocus"
            @blur="handleBlur"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="显示格式">
        <el-select
            class="full-width"
            :value="configData.props.format"
            @change="handleFormatChange"
        >
          <el-option label="XX天XX时XX分XX秒" value="ddHHmmss"></el-option>
          <el-option label="XX天" value="dd"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="textLabel">
        <textField
            :configData="configData"
            :config="{ props: {}, target: 'props.text' }"
        ></textField>
      </el-form-item>



    </el-form>
  </div>
</template>

<script>
  import '../../editors';
  import { get } from '@/register';
  import { REG_EDITORS } from '@/const';
  import {mapMutations} from '../../../../store/index';
  import {
    AFTER_UPDATE_COMPONENT_PROPS,
    BEFORE_UPDATE_COMPONENT_PROPS, UPDATE_COMPONENT_PROPS,
    UPDATING_COMPONENT_PROPS,
  } from '../../../../constant/schema';

  export default {
    name: 'BaseCountTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config', 'isCountdown'],
    computed: {
      date() {
        return new Date(this.configData.props[this.getKey()]);
      },
      textLabel() {
        return this.isCountdown ? '时间到达后显示' : ' 时间未到达时显示';
      },
      dateLabel() {
        return this.isCountdown ? '截止时间' : ' 开始时间';
      }
    },
    created(){
      console.log("create");
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      handleInput(value) {
        const key = this.getKey();
        this.updateSchema({
          type: UPDATING_COMPONENT_PROPS,
          value: {[`props.${key}`]: value.getTime()},
        });
      },
      handleBlur() {
        const key = this.getKey();
        this.updateSchema({
          type: AFTER_UPDATE_COMPONENT_PROPS,
          value: {[`props.${key}`]: this.configData.props[key]},
        });
      },
      handleFocus() {
        this.updateSchema({
          type: BEFORE_UPDATE_COMPONENT_PROPS,
        });
      },
      handleFormatChange(value) {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          value: {'props.format': value},
        });
      },
      getKey() {
        return this.isCountdown ? 'endTime' : 'startTime';
      },
    },

  }
</script>

<style lang="less" scoped>

</style>
