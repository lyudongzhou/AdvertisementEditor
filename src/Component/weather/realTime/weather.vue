<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="realTimeForecastContainer" v-if="weather">
      <div class="location">
        <i class="el-icon-location"></i>
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
      let ipinit = this.ipInit();
      this.$axios.get('/weather/get', {
        needday: 1,
        ip: ipinit,
      }).then((res) => {
        this.weather = res.data.now;
      })
    },
    methods: {
      ipInit () {
        let ip;
        if (window.ip) {
          ip = window.ip&&window.ip.ip;
        } else {
          console.error('ip获取失败');
          return '';
        }
        var num = 0;
        ip = ip.split(".");
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
      },
    },
    watch: {},
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
        margin-left: 10px;
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
  // @bgs: 00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,53,99,301,302;
  @bgs: 00,01,02,04,07,10,33;
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
  // each(@bgs, {
  //   .sel-0@{value} when (@{value}<10) {
  //     background: url("../../../Designer/public/weather/0@{value}.png");
  //   }
  //   .sel-@{value} when (@{value}>=10) {
  //     background: url("../../../Designer/public/weather/@{value}.png");
  //   }
  // });

</style>
