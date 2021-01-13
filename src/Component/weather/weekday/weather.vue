<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="weekdayForecastContainer">
      <h2>7天预报（北京）</h2>
      <ul>
        <li v-for="(child,index) in day" :key="index">
          <p>周{{child.week}}</p>
          <p>{{child.date}}</p>
          <p>白天：{{child.day_air_temperature}}℃</p>
          <p>{{child.day_air_weather}}</p>
          <!-- <p><img :url="child.day_weather_code" /></p> -->
          <p>{{child.day_wind_direction}}</p>
          <p>{{child.day_wind_power}}</p>
          <p>夜间：{{child.night_air_temperature}}℃</p>
          <p>{{child.night_air_weather}}</p>
          <!-- <p><img :url="child.night_weather_code" /></p> -->
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
        day: [
          {
              "date": "01-13",
              "night_air_weather": "晴",
              "week": "三",
              "night_wind_direction": "南风",
              "day_air_weather": "晴",
              "night_air_temperature": "-7",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "<3级",
              "day_air_temperature": "8",
              "day_wind_direction": "东南风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-14",
              "night_air_weather": "多云",
              "week": "四",
              "night_wind_direction": "北风",
              "day_air_weather": "多云",
              "night_air_temperature": "-7",
              "day_weather_code": "01",
              "night_weather_code": "01",
              "day_wind_power": "<3级",
              "day_air_temperature": "3",
              "day_wind_direction": "西北风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-15",
              "night_air_weather": "晴",
              "week": "五",
              "night_wind_direction": "北风",
              "day_air_weather": "晴",
              "night_air_temperature": "-8",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "3-4级",
              "day_air_temperature": "4",
              "day_wind_direction": "北风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-16",
              "night_air_weather": "晴",
              "week": "六",
              "night_wind_direction": "西北风",
              "day_air_weather": "晴",
              "night_air_temperature": "-10",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "3-4级",
              "day_air_temperature": "1",
              "day_wind_direction": "西北风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-17",
              "night_air_weather": "晴",
              "week": "日",
              "night_wind_direction": "西南风",
              "day_air_weather": "晴",
              "night_air_temperature": "-10",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "<3级",
              "day_air_temperature": "4",
              "day_wind_direction": "南风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-18",
              "night_air_weather": "晴",
              "week": "一",
              "night_wind_direction": "北风",
              "day_air_weather": "晴",
              "night_air_temperature": "-8",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "<3级",
              "day_air_temperature": "6",
              "day_wind_direction": "东南风",
              "night_wind_power": "<3级"
          },
          {
              "date": "01-19",
              "night_air_weather": "晴",
              "week": "二",
              "night_wind_direction": "西北风",
              "day_air_weather": "晴",
              "night_air_temperature": "-7",
              "day_weather_code": "00",
              "night_weather_code": "00",
              "day_wind_power": "<3级",
              "day_air_temperature": "5",
              "day_wind_direction": "东风",
              "night_wind_power": "<3级"
          }
      ]
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
  }
</style>
