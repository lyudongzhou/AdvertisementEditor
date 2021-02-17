<template lang="html">
  <div class="prompt" v-if="showDialog">
    <div class="mask"></div>
    <div class="dialog">
      <p class="title">
        <b>删除</b>
        <i class="el-icon-error" @click="handleCancel"></i>
      </p>
      <p class="content">确认删除页面？</p>
      <p class="btns">
        <button class="btn_cancel" @click="handleCancel">取消</button>
        <button class="btn_correct" @click="handleCorrect">确定</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'promptDialog',
  data () {
    return {
      showDialog: false,
      needId: null,
    }
  },
  mounted () {
    this.$event.on('openPromptDialog', (id) => {
      this.showDialog = true;
      this.needId = id;
    });
  },
  methods: {
    handleCancel () {
      this.showDialog = false;
    },
    handleCorrect () {
      this.$event.emit('correct', this.needId);
      this.showDialog = false;
    }
  }
}
</script>

<style lang="less" scoped>
  .prompt {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000000;
      opacity: 0.5;
    }
    .dialog {
      position: absolute;
      width: 422px;
      height: 202px;
      margin: 200px auto 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      .title {
        width: 100%;
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #E6E9F2;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        b {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          text-indent: 28px;
        }
        i {
          color: #CBCDD4;
          font-size: 24px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .content {
        flex: 1;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btns {
        width: 100%;
        height: 55px;
        text-align: center;
        button {
          width: 84px;
          height: 34px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          border: 0;
          font-weight: 400;
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 14px;
        }
        .btn_cancel {
          background: #FFFFFF;
          border: 1px solid #CBCDD4;
          margin-right: 12px;
          color: #000000;
        }
        .btn_correct {
          background: #428FFA;
          color: #FFF;
        }
      }
    }
  }
</style>
