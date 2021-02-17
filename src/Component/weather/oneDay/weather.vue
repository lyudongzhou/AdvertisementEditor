<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="oneDayForecastContainer" v-if="weather">
      <p>24小时预报({{weather.city||'北京省'}})</p>
      <ul>
        <li v-for="(child,index) in weather.hour" :key="index">
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
        needday: 24,
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
  .oneDayForecastContainer {
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
      margin-top: 10px;
      li {
        flex: 1;
        min-width: 80px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        p {
          margin-top: 10px;
        }
      }
      li:not(:last-child) {
        box-sizing: border-box;
        border-right: 1px solid #EEEEEE;
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
