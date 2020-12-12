<template lang="html">
  <div class="upload_img" v-if="isShowDialog">
    <div class="upload">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3">
        <button class="pub_btn">上传</button>
      </el-upload>
    </div>
    <div class="upload_detail">
      <div class="detail_top">
        <button class="pub_btn collect">我的收藏</button>
        <p class="search">
          <input type="text" name="" value="" placeholder="请输入文件名">
          <span class="el-icon-search search_icon"></span>
        </p>
      </div>
      <div class="content"></div>
      <div class="detail_operation">
        <button class="pub_btn" @click="isShowDialog=false">取消</button>
        <button class="pub_btn">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'uploadImg',
    props: ['isShow'],
    data() {
      return {
        isShowDialog: this.isShow
      };
    },
    methods: {
    },
  }
</script>

<style lang="less" scoped>
  .upload_img {
    position: fixed;
    z-index: 3;
    width: 902px;
    height: 523px;
    background: #FFFFFF;
    box-shadow: 3px 11px 13px 0px rgba(144, 144, 144, 0.5);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .pub_btn {
      width: 130px;
      height: 45px;
      outline: none;
      border: 1px solid #1391FF;
      box-sizing: border-box;
      text-align: center;
      line-height: 45px;
      background: #FFFFFF;
      border-radius: 10px;
      border: 1px solid #1391FF;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1391FF;
      cursor: pointer;
    }
    .pub_btn:hover {
      background: #1391FF;
      color: #FFFFFF;
    }
    .upload {
      width: 100%;
      height: 70px;
      border-bottom: 1px solid #EFEFEF;
      box-sizing: border-box;
      .upload-demo {
        margin: 16px 0 0 33px;
      }
    }
    .upload_detail {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .detail_top {
        width: 100%;
        height: 45px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .collect {
          margin-left: 33px;
        }
        .search {
          margin-right: 24px;
          width: 277px;
          height: 45px;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid #CDCDCD;
          line-height: 45px;
          display: flex;
          justify-content: space-between;
          input {
            flex: 1;
            outline: none;
            text-indent: 13px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #A2A2A2;
          }
          .search_icon {
            width: 45px;
            height: 45px;
            background: #FE971E;
            border-radius: 10px;
            color: #FFFFFF;
            font-size: 30px;
            text-align: center;
            line-height: 45px;
          }
        }
      }
      .content {
        flex: 1;
      }
      .detail_operation {
        width: 100%;
        height: 45px;
        margin-bottom: 20px;
        text-align: center;
        .pub_btn:first-child {
          margin-right: 28px;
        }
      }
    }
  }
</style>
