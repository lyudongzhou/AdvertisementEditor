<template lang="html">
  <div class="upload_img">
    <div class="upload">
      <label class="upload_text pub_btn" for="avatar">上传图片</label>
      <input type="file" class="upload_input"
             id="avatar" name="avatar"
             @change="uploadImg"
             accept="image/png, image/jpeg">
    </div>
    <div class="upload_detail">
      <div class="detail_top">
        <button class="pub_btn collect">我的收藏</button>
        <p class="search">
          <input type="text" v-model="searchFile" placeholder="请输入文件名">
          <span class="el-icon-search search_icon"></span>
        </p>
      </div>
      <ul class="content infinite-list"
          v-infinite-scroll="getImgResources"
          infinite-scroll-disabled="connotLoad"
          infinite-scroll-distance=100
          style="overflow:auto">
          <li class="img_list" :class="{'check_list':checkImg&&checkImg.resId===img.resId}"
              v-for="(img,index) in handleSearchFile" :key="index" @click="checkImg=img">
            <div class="identification" v-if="checkImg&&checkImg.resId===img.resId">
              <span class="check_img"></span>
              <i class="el-icon-check check_icon"></i>
            </div>
            <img :src="img.resUrl" ref="img" />
            <span class="img_name">{{img.resName}}</span>
          </li>
        </ul>
      <div class="detail_operation">
        <button class="pub_btn" @click="handleCancel">取消</button>
        <button class="pub_btn" @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'uploadImg',
    props: ['showDialog'],
    data() {
      return {
        resources: [],
        checkImg: null,
        userId: 1,
        resType: 1,
        currentPage: 1,
        size: 50,
        total: null,
        isLoading: false,
        searchFile: '',
      };
    },
    created () {
    },
    mounted () {
    },
    computed: {
      connotLoad () {
        if (this.total === null) {
          return this.isLoading;
        } else {
          return (this.isLoading || this.size*this.currentPage-this.size>=this.total);
        }
      },
      handleSearchFile () {
        let searchFile = this.searchFile.toLowerCase(),
            resources = this.resources;
        resources = resources.filter(child => {
          if (child.resName.toLowerCase().indexOf(searchFile)>-1) {
            return child;
          }
        })
        return resources;
      },
    },
    methods: {
      uploadImg (e) {
        let formData = new FormData(),
            file = e.target.files[0];
        formData.append("file", file);
        formData.append("type", 1);
        formData.append("cateforyId", 1);
        formData.append("fileName", file.name);
        this.$axios.post("/res/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
          // 获取最新资源
        })
      },
      // 获取图片资源
      getImgResources () {
        this.isLoading = true;
        this.$axios.get("/res/get", {
          resType: this.resType,
          userId: this.userId,
          current: this.currentPage,
          size: this.size,
        }).then((res) => {
          this.total = res.data.total;
          let resources = res.data.resources;
          this.resources.push(...resources);
          this.currentPage++;
          this.isLoading = false;
        })
      },
      handleCancel () {
        this.$emit('showDialog', false);
      },
      handleConfirm () {
        this.$emit('showDialog', false, this.checkImg.resUrl);
      },
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
        // flex: 1;
        height: 340px;
        display: flex;
        flex-flow:row wrap;
        margin-top: 10px;
        .img_list {
          width: 100px;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          margin: 5px 5px 0;
          overflow: hidden;
          border: 1px solid #ccc;
          box-sizing: border-box;
          img {
            width: auto;
            height: 85%;
          }
          .img_name {
            line-height: initial;
            font-size: 10px;
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
          .check_list {
            border: 1px solid green;
            box-sizing: border-box;
          }
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
