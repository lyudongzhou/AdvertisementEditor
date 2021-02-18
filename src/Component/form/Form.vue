<template>
  <baseCmp :cmpConfig="cmpConfig">
    <div class="vote">
      <div class="vote-title">{{props.voteTitle}}</div>
      <div class="vote-container">
        <div :class="['vote-item', {activate: item.optionIndex === activate}]"
             v-for="item in props.voteOption"
             :key="item.optionIndex"
             @click="select(item.optionIndex)">
          <img :src="handleUrl(item.photoUrl)" :alt="item.optionMemo" width="250" height="250">
          <div class="vote-item-title">{{item.optionMemo}}</div>
          <span class="submit" @click="handleClick(item)"><span>提交</span></span>
        </div>
      </div>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";

export default {
  name: "voteCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data() {
    return {
      activate: -1
    };
  },
  methods: {
    handleClick() {
      const {voteStartDate, voteFinishDate} = this.props;
      const startTimestamp = (new Date(voteStartDate)).getTime();
      const finishTimestamp = (new Date(voteFinishDate)).getTime();
      const now = (new Date()).getTime();
      if (now < startTimestamp) {
        alert("投票未开始");
        return;
      }
      if (now > finishTimestamp) {
        alert("投票已结束");
        return;
      }
      // todo
    },
    select(index) {
      if (!this.designMode) {
        this.activate = index;
      }
    }
  },
  computed: {
    props() {
      return this.cmpConfig.props || {};
    },
//    width() {
//      return this.cmpConfig.layoutConfig.width;
//    }
    ...mapGetters(["handleUrl", "designMode"]),
  }
}
</script>

<style lang="less" scoped>
.vote {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #333;
  text-align: center;

  .vote-title {
    font-size: 20px;
    font-weight: bold;
  }
}
.vote-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .vote-item {
    width: 250px;
    height: 300px;
    border: 1px solid #979797;
    position: relative;
    margin: 5px;

    .vote-item-title {
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      border-top: 1px solid #979797;
    }

    &.activate {
      background-color: rgba(0, 0, 0, .38);
      .submit {
        display: inline;
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        color: #1391FF;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        font-size: 20px;

        > span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .submit {
      display: none;
    }
  }
}
</style>