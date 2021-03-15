<template lang="html">
  <div class="bg_music">
    <p class="title">背景音乐</p>
    <div class="order">
      <p class="title">顺序播放</p>
      <el-radio v-for="i in orderList" :key="i.id" v-model="currentPage.container.bgMusic.type" :label="i.id" @change="changeOrder(i.id)">{{i.name}}</el-radio>
    </div>
    <div class="volume">
      <span class="title">音量</span>
      <el-slider v-model="volume" @change="changeVolume"></el-slider>
    </div>
    <div class="list">
      <div class="list_title">
        <p>音乐列表</p>
        <p>
          <span class="add_icon el-icon-circle-plus" @click="addMusic"></span>
          <span class="add_music" @click="addMusic">添加音乐</span>
        </p>
      </div>
      <ul>
        <li class="bg" v-for="(music, index) in currentPage.container.bgMusic.music" :key="index">
          <p>{{music.resName}}</p>
          <p>
            <span class="play_icon el-icon-video-play" @click="playAduio(index)"></span>
            <span class="delete_icon el-icon-circle-close" @click="deleteMusic(index)"></span>
          </p>
          <audio :src="music.sourcePaht" :ref="index"></audio>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "../../store";

export default {
  name: 'bg_music',
  data () {
    return {
      orderList: [
        {id:1,name:'列表循环'},
        {id:2,name:'顺序播放'},
        {id:3,name:'随机播放'},
      ],
      volume: 50,
      playing: null,
      order: 1,
    }
  },
  computed: {
    ...mapGetters(["currentPage"]),
  },
  mounted () {
    this.order = this.currentPage.container.bgMusic.type;
  },
  methods: {
    ...mapMutations([
      'updateSchema',
    ]),
    addMusic () {
      this.$event.emit("openUploadWin", {
        onSelect: (bgmList) => {
          console.log(bgmList);
          // let test = [
          //   {
          //     "resName": "bg1",
          //     "sourcePaht": "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/zhangrui/tice/2021/%E5%B9%BC%E6%95%99%E6%98%A5%E5%AD%A3%E4%B8%AD%E7%8F%AD/3-2/math_area_of_comparative/resources/assets/audios/bg.mp3"
          //   },
          //   {
          //     "resName": "bg2",
          //     "sourcePaht": "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/zhangrui/tice/2021/%E5%B9%BC%E6%95%99%E6%98%A5%E5%AD%A3%E4%B8%AD%E7%8F%AD/3-2/math_area_of_comparative/resources/assets/audios/bg.mp3"
          //   },
          //   {
          //     "resName": "bg3",
          //     "sourcePaht": "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/zhangrui/tice/2021/%E5%B9%BC%E6%95%99%E6%98%A5%E5%AD%A3%E4%B8%AD%E7%8F%AD/3-2/math_area_of_comparative/resources/assets/audios/right1.mp3"
          //   }
          // ];
          this.updateBGM('beforeupdatePage', this.currentPage.container.bgMusic.music)
          this.updateBGM('AFTRE_BG_MUSIC', bgmList)
        },
        aSelectType: ['audio'],
        multi: true,
        title: '音频',
      });
    },
    updateBGM (type, data) {
      this.updateSchema({
        type: type,
        value: {
          'music': data
        }
      })
    },
    updateBGMType (type, data) {
      this.updateSchema({
        type: type,
        value: {
          'type': data
        }
      })
    },
    deleteMusic (index) {
      let musicList = this.currentPage.container.bgMusic.music;
      this.updateBGM('beforeupdatePage', this.currentPage.container.bgMusic.music)
      musicList.splice(index, 1);
      this.updateBGM('AFTRE_BG_MUSIC', musicList)
    },
    playAduio (index) {
      this._playing && this._playing.pause();
      this._playing = this.$refs[index][0];
      this._playing.volume = this.volume/100;
      this._playing.play();
    },
    changeVolume (volume) {
      this.volume = volume;
      this._playing.volume = this.volume/100;
    },
    changeOrder (id) {
      this.updateBGMType('beforeupdatePage', this.order);
      this.order = id;
      this.updateBGMType('AFTRE_BG_MUSIC', id);
    }
  }
}
</script>

<style lang="less" scoped>
  .bg_music {
    width: 248px;
    height: auto;
    margin: auto;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      padding-bottom: 24px;
      margin-left: 25px;
    }
    .order {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      .el-radio {
        margin-bottom: 18px;
        color: #FFFFFF;
        margin-left: 25px;
      }
    }
    .volume {
      width: 80%;
      margin: auto;
      .title {
        margin: 0;
      }
    }
    .list {
      margin-bottom: 50px;
      .list_title {
        width: 100%;
        height: 32px;
        line-height: 32px;
        background: #5C5B5B;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        p:first-child {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          padding-left: 24px;
        }
        p:last-child {
          color: #44A5FF;
          font-weight: 500;
          .add_icon {
            cursor: pointer;
          }
          .add_music {
            margin: 0 20px 0 8px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
      .bg {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: auto;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        box-sizing: border-box;
        font-size: 14px;
        p:first-child {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
        .delete_icon {
          margin-left: 10px;
          color: #ff0000;
          cursor: pointer;
        }
        .play_icon {
          color: #44A5FF;
          cursor: pointer;
        }
      }
      .bg:last-child {
        border: none;
      }
    }
  }
</style>
