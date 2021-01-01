<template lang="html">
  <div class="edit_window" v-if="configData">
    <div class="title">编辑图表数据</div>
    <table>
      <tr>
        <td></td>
        <td v-for="(name,index) in configData.props.series[0].data" :key="index">{{name.name}}</td>
      </tr>
      <tr v-for="(legend,index) in configData.props.legend.data" :key="index">
        <td>{{legend}}</td>
        <td></td>
      </tr>
    </table>
    <div class="buttons">
      <button class="cancel">取消</button>
      <button class="correct">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editWindow',
  data () {
    return {
      configData: null
    }
  },
  mounted () {
    this.$event.on('edit-window', data=>{
      this.configData = data;
    })
  }
}
</script>

<style lang="less" scoped>
  .edit_window {
    width: 900px;
    height: 523px;
    position: absolute;
    margin: 50px auto 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    .title {
      height: 70px;
      background: #F7F7F7;
      border-radius: 5px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #75838F;
      line-height: 70px;
      padding-left: 34px;
    }
    table {
      flex: 1;
      overflow: scroll;
      td {
        width: 210px;
        height: 51px;
        text-align: center;
        line-height: 51px;
        background: #FFFFFF;
        border: 1px solid #E2E2E2;
        box-sizing: border-box;
        min-width: 100px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
    .buttons {
      width: 100%;
      height: 65px;
      display: flex;
      justify-content: center;
      button {
        width: 130px;
        height: 45px;
        border-radius: 10px;
        border: 1px solid #1391FF;
        background: #FFFFFF;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1391FF;
      }
      button:last-child {
        margin-left: 28px;
        background: #1391FF;
        border: none;
        color: #FFFFFF;
      }
    }
  }
</style>
