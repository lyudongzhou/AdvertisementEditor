<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="oneDayForecastContainer">
      <h2>24小时预报（北京）</h2>
      <ul>
        <li v-for="(child,index) in hour" :key="index">
          <p>{{child.time}}</p>
          <p>{{child.temperature}}℃</p>
          <p>{{child.weather}}</p>
          <p>{{child.wind_direction}}</p>
          <p>{{child.wind_power}}</p>
        </li>
      </ul>
    </div>
  </baseCmp>
</template>

<script>
  import baseCmp from "../../Base.vue";

  export default {
    name: "oneDayForecastCmp",
    props: ["cmpConfig"],
    components: {
      baseCmp,
    },
    data() {
      return {
        hour: [
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "1",
            "weather": "晴",
            "time": "18:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "0",
            "weather": "晴",
            "time": "19:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东南风",
            "wind_power": "<3级",
            "temperature": "-2",
            "weather": "晴",
            "time": "20:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-2",
            "weather": "晴",
            "time": "21:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-2",
            "weather": "晴",
            "time": "22:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "-2",
            "weather": "晴",
            "time": "23:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-3",
            "weather": "晴",
            "time": "00:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-3",
            "weather": "晴",
            "time": "01:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "-3",
            "weather": "晴",
            "time": "02:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-5",
            "weather": "晴",
            "time": "03:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-5",
            "weather": "晴",
            "time": "04:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "-5",
            "weather": "晴",
            "time": "05:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东南风",
            "wind_power": "<3级",
            "temperature": "-7",
            "weather": "晴",
            "time": "06:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东风",
            "wind_power": "<3级",
            "temperature": "-7",
            "weather": "晴",
            "time": "07:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "-6",
            "weather": "晴",
            "time": "08:00",
            "weather_code": "00"
        },
        {
            "wind_direction": "东南风",
            "wind_power": "<3级",
            "temperature": "-5",
            "weather": "多云",
            "time": "09:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "东南风",
            "wind_power": "<3级",
            "temperature": "-3",
            "weather": "多云",
            "time": "10:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "-2",
            "weather": "多云",
            "time": "11:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "0",
            "weather": "多云",
            "time": "12:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "南风",
            "wind_power": "<3级",
            "temperature": "1",
            "weather": "多云",
            "time": "13:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "2",
            "weather": "多云",
            "time": "14:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "2",
            "weather": "多云",
            "time": "15:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "1",
            "weather": "多云",
            "time": "16:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "0",
            "weather": "多云",
            "time": "17:00",
            "weather_code": "01"
        },
        {
            "wind_direction": "西北风",
            "wind_power": "<3级",
            "temperature": "-1",
            "weather": "多云",
            "time": "18:00",
            "weather_code": "01"
        }],
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
  .oneDayForecastContainer {
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
