<template lang="html">
  <div class="upload_img">
    <div class="upload">
      <label class="upload_text pub_btn" for="avatar">上传图片</label>
      <input type="file" class="upload_input"
             id="avatar" name="avatar"
             accept="image/png, image/jpeg">
    </div>
    <div class="upload_detail">
      <div class="detail_top">
        <button class="pub_btn collect">我的收藏</button>
        <p class="search">
          <input type="text" name="" value="" placeholder="请输入文件名">
          <span class="el-icon-search search_icon"></span>
        </p>
      </div>
      <div class="content">
        <ul>
          <li class="img_list" :class="{'check_list':checkImgs.indexOf(img.bgUrl)>-1}" v-for="(img,index) in local" :key="index" @click="checkImg(img.bgUrl)">
            <div class="identification" v-if="checkImgs.indexOf(img.bgUrl)>-1">
              <span class="check_img"></span>
              <i class="el-icon-check check_icon"></i>
            </div>
            <img :src="img.bgUrl" ref="img" />
          </li>
        </ul>
      </div>
      <div class="detail_operation">
        <button class="pub_btn" @click="handleCancel">取消</button>
        <button class="pub_btn" @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from '../../store';

  export default {
    name: 'uploadImg',
    props: ['showDialog'],
    data() {
      return {
        local: [
          {
            bgUrl: "images/Koala.jpg",
          }
        ], // TODO: 改为服务器获取到的数据
        checkImgs: [],
      };
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      ...mapMutations([
        'updateSchema',
      ]),
      handleCancel () {
        this.$emit('showDialog', false);
      },
      checkImg (url) {
        this.checkImgs.shift();
        this.checkImgs.push(url);
      },
      handleConfirm () {
        this.$emit('showDialog', false);
        this.updateSchema({
          type: "beforeupdatePage"
        });
        this.updateSchema({
          type: "afterPage",
          value: {
            ['type']: 'image',
            ["value"]: this.checkImgs[0]
          },
        });
      }
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
      .upload_text {
        display: inline-block;
        margin: 16px 0 0 33px;
      }
      .upload_input {
        font-size: 16px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
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
        .img_list {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          img {
            width: 100%;
            height: auto;
          }
          .identification {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            text-align: right;
            .check_img {
              position: absolute;
              top: 0;
              right: 0;
              width: 0;
              height: 0;
              border-top: 40px solid #3c822e;
              border-left: 40px solid transparent;
              display: block;
              content: "";
              color: #ffffff;
            }
            .check_icon {
              position: absolute;
              right: 0;
              top: 0;
              font-weight: 800;
              font-size: 20px;
              color: #FFFFFF;
            }
          }
        }
        .check_list {
          border: 1px solid green;
          box-sizing: border-box;
        }
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
