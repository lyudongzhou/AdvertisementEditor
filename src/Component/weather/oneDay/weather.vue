<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="oneDayForecastContainer" v-if="weather">
      <h2>24小时预报（北京）</h2>
      <ul>
        <li v-for="(child,index) in weather" :key="index">
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
      let ipinit = this.ipInit();
      this.$axios.get('/weather/get', {
        needday: 24,
        ip: ipinit
      }).then((res) => {
        this.weather = res.data.hour;
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
