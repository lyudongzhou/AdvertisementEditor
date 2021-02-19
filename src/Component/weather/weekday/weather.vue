<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="weekdayForecastContainer" v-if="weather">
      <p>7天预报({{weather.cityinfo.city||'北京省'}})</p>
      <ul>
        <li v-for="(child,index) in weather.day" :key="index">
          <p>周{{child.week}}</p>
          <p>{{child.date}}</p>
          <p>白天：{{child.day_air_temperature}}℃</p>
          <p>{{child.day_air_weather}}</p>
          <p :class="`weather_icon bg-${Number(child.day_weather_code)}`"></p>
          <p>{{child.day_wind_direction}}</p>
          <p>{{child.day_wind_power}}</p>
          <p>夜间：{{child.night_air_temperature}}℃</p>
          <p>{{child.night_air_weather}}</p>
          <p :class="`weather_icon bg-${Number(child.night_weather_code)}`"></p>
          <p>{{child.night_wind_direction}}</p>
          <p>{{child.night_wind_power}}</p>
        </li>
      </ul>
    </div>
  </baseCmp>
</template>

<script>
  import baseCmp from "../../Base.vue";

  export default {
    name: "weekdayForecastCmp",
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
        needday: 7,
        ip: ip
      }).then((res) => {
        this.weather = res.data;
      })
    },
    methods: {
    },
    watch: {},
  };
</script>

<style lang="less" scoped>
  .weekdayForecastContainer {
    width: 90%;
    height: 90%;
    font-size: 14px;
    margin: auto;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    box-sizing: border-box;
    >p {
      width: 100%;
      height: 46px;
      line-height: 46px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      border-bottom: 1px solid #EEEEEE;
      box-sizing: border-box;
      text-indent: 17px;
    }
    ul {
      display: flex;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      li {
        flex: 1;
        min-width: 80px;
        text-align: center;
        p {
          margin-top: 20px;
        }
      }
      li:not(:last-child) {
        border-right: 1px solid #EEEEEE;
        box-sizing: border-box;
      }
    }
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
  }
</style>
