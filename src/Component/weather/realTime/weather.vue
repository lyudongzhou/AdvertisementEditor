<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="realTimeForecastContainer" v-if="weather">
      <div class="location">
        <img src="../../../Designer/public/weather/location.png" />
        <span>{{weather.prev}} </span>
        <span>{{weather.city}}</span>
      </div>
      <div class="real">
        <p>空气 {{weather.quality}}</p>
        <p>{{weather.time}} 更新</p>
      </div>
      <div class="temperature">
        <span>{{weather.temperature}}℃</span>
        <i :class="`weather_icon bg-${Number(weather.weather_code)}`"></i>
        <span>{{weather.weather}}</span>
      </div>
      <div class="remind">
        <p>
          <img src="../../../Designer/public/weather/humidity.png" />
          <span>湿度 {{weather.humidity}}</span>
        </p>
        <p>
          <img src="../../../Designer/public/weather/wind_power.png" />
          <span>{{weather.wind_direction}} {{weather.wind_power}}</span>
        </p>
      </div>
    </div>
  </baseCmp>
</template>

<script>
  import baseCmp from "../../Base.vue";

  export default {
    name: "realTimeForecastCmp",
    props: ["cmpConfig"],
    components: {
      baseCmp,
    },
    data() {
      return {
        weather: null,
      };
    },
    computed: {
    },
    mounted() {
      let ip;
      if (window.ip) {
        ip = window.ip&&window.ip.ip;
      } else {
        console.error('ip获取失败');
      }
      this.$axios.get('/weather/get', {
        needday: 1,
        ip: ip,
      }).then((res) => {
        this.weather = res.data.now;
      })
    },
    methods: {
    },
    watch: {},
  };
</script>

<style lang="less" scoped>
  .realTimeForecastContainer {
    width: 90%;
    height: 100%;
    font-size: 16px;
    margin: auto;
    color: #333333;
    >div {
      margin-top: 5px;
    }
    .location {
      margin-top: 10px;
      span {
        margin-left: 10px;
      }
    }
    .real {
      display: flex;
      p:first-child {
        background: #ffc000;
        border: 1px solid #fcda74;
        box-sizing: border-box;
        padding: 2px;
        white-space: nowrap;
        margin-right: 20px;
      }
    }
    .temperature {
      display: flex;
      align-items: center;
      span:nth-child(1) {
        font-size: 96px;
        margin-right: 26px;
      }
      span:nth-child(3) {
        margin-left: 13px;
        font-size: 28px;
      }
    }
    .remind {
      display: flex;
      p:first-child {
        margin-right: 15px;
      }
      span {
        margin-left: 11px;
      }
    }
  }
  // @bgs: 00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,53,99,301,302;
  @bgs: 00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20;
  each(@bgs, {
    .bg-@{value} {
      background: url("../../../Designer/public/weather/@{value}.png");
    }
  });
  .weather_icon {
    display: inline-block;
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-size: 45px auto;
  }
</style>
