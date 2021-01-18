<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="weekdayForecastContainer">
      <h2>7天预报（北京）</h2>
      <ul v-if="weather">
        <li v-for="(child,index) in weather" :key="index">
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
      let ipinit = this.ipInit();
      this.$axios.get('/weather/get', {
        needday: 7,
        prev: ipinit,
        city: ipinit,
        area: ipinit
      }).then((res) => {
        this.weather = res.data.day;
      })
    },
    methods: {
      ipInit () {
        let ip = window.ip.ip;
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
  .weekdayForecastContainer {
    width: 90%;
    height: 100%;
    font-size: 14px;
    margin: auto;
    ul {
      display: flex;
      margin-top: 10px;
      li {
        flex: 1;
        min-width: 50px;
        text-align: center;
        p {
          margin-top: 5px;
        }
      }
    }
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
  }
</style>
