<template>
  <baseCmp :cmpConfig="cmpConfig">
    <div class="vote">
      <div class="vote-title">{{ props.title }}</div>
      <div class="vote-container">
        <div
          :class="['vote-item', { activate: item.uuid === activate }]"
          v-for="item in props.element[0].choices"
          :key="item.uuid"
          @click="select(item.uuid)"
        >
          <img
            :src="handleUrl(item['image-url'])"
            :alt="item.text"
            width="250"
            height="250"
          />
          <div class="vote-item-title">{{ item.text }}</div>
          <span
            class="submit"
            @click="handleClick(item, props.element[0], props)"
            ><span>提交</span></span
          >
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
      activate: -1,
    };
  },
  created() {
    this.cmpConfig.props.data.config = JSON.parse(
      this.cmpConfig.props.data.json
    );
    this.props = this.cmpConfig.props.data.config;
  },
  methods: {
    handleClick(item, vote, props) {
      const { voteStartDate, voteFinishDate } = this.props;
      const startTimestamp = new Date(voteStartDate).getTime();
      const finishTimestamp = new Date(voteFinishDate).getTime();
      const now = new Date().getTime();
      if (now < startTimestamp) {
        alert("投票未开始");
        return;
      }
      if (now > finishTimestamp) {
        alert("投票已结束");
        return;
      }

      // todo
      function dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(), // 年
          "m+": (date.getMonth() + 1).toString(), // 月
          "d+": date.getDate().toString(), // 日
          "H+": date.getHours().toString(), // 时
          "M+": date.getMinutes().toString(), // 分
          "S+": date.getSeconds().toString(), // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
          }
        }
        return fmt;
      }

      let o = {
        uuid: props.uuid,
        "commit-time": dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
        element: [
          {
            uuid: vote.uuid,
            answer: item.lavel,
          },
        ],
      };
      this.$axios
        .post("/vote/add", {
          pluginId: this.props.data.id,
          deviceCode: "",
          planUuid: "",
          prograUuid: "",
          json: JSON.stringify(o),
        })
        .then(() => {});
    },
    select(index) {
      if (!this.designMode) {
        this.activate = index;
      }
    },
  },
  computed: {
    //    width() {
    //      return this.cmpConfig.layoutConfig.width;
    //    }
    ...mapGetters(["handleUrl", "designMode"]),
  },
};
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
      background-color: rgba(0, 0, 0, 0.38);
      .submit {
        display: inline;
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        color: #1391ff;
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