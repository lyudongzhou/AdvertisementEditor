<template>
  <div class="basic_tab">
    <el-form ref="form" class="full-width" size="mini" label-position="left">
      <el-form-item label="计时时间(秒)">
          <numberField
              class="full-width"
              :configData="configData"
              :config="{ props: {min: 3}, target: 'props.countTime' }"
          ></numberField>
      </el-form-item>

      <el-form-item label="计时结束后显示">
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

  export default {
    name: 'TimerTab',
    components: get(REG_EDITORS),
    props: ['configData', 'config'],
  }
</script>

<style lang="less" scoped>

</style>
