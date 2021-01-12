<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="realTimeForecastContainer">
      <div class="location">
        <i class="el-icon-location"></i>
        <span>{{weather.prev}} </span>
        <span>{{weather.city}}</span>
      </div>
      <div class="real">
        <p>
          <span>空气 {{weather.quality}}</span>
          <span> {{weather.weather_code}}</span>
        </p>
        <p>{{weather.time}} 更新</p>
      </div>
      <div class="temperature">
        <span>{{weather.temperature}}℃</span>
        <i><img :url="zfine" /></i>
        <span>{{weather.weather}}</span>
      </div>
      <div class="remind">
        <p>
          <!-- <img src="" /> -->
          <i class="el-icon-heavy-rain"></i>
          <span>湿度 {{weather.humidity}}</span>
        </p>
        <p>
          <!-- <img src="" /> -->
          <i class="el-icon-partly-cloudy"></i>
          <span>{{weather.wind_direction}} {{weather.wind_power}}</span>
        </p>
      </div>
    </div>
  </baseCmp>
</template>

<script>
  import baseCmp from "../../Base.vue";
  import fine from "../../../Designer/public/fine.png";

  export default {
    name: "realTimeForecastCmp",
    props: ["cmpConfig"],
    components: {
      baseCmp,
    },
    data() {
      return {
        weather: {
          "prev": "北京省",
          "city": "北京市",
          "wind_direction": "东北风",
          "wind_power": "1级",
          "quality": "轻度污染",
          "temperature": "0",
          "weather": "晴",
          "humidity": "32%",
          "time": "20:30",
          "weather_code": "00",
        },
        zfine: fine,
      };
    },
    watch: {},
    methods: {},
    computed: {},
    mounted() {
      this.url = this.cmpConfig.props.url;
    },
  };
</script>

<style lang="less" scoped>
  .realTimeForecastContainer {
    width: 80%;
    height: 100%;
    font-size: 14px;
    margin: auto;
    >div {
      margin-top: 5px;
    }
    .real {
      display: flex;
      p:first-child {
        color: #000;
        background: #ffc000;
        border: 1px solid #fcda74;
        box-sizing: border-box;
        padding: 2px;
        white-space: nowrap;
        margin-right: 20px;
      }
    }
    .temperature {
      span:nth-child(1) {
        font-size: 95px;
        margin-right: 10px;
      }
      span:nth-child(2) {
        font-size: 30px;
      }
    }
    .remind {
      display: flex;
      p:first-child {
        margin-right: 10px;
      }
    }
  }
</style>
