<template lang="html">
  <baseCmp :cmpConfig="cmpConfig">
    <div class="realTimeForecastContainer" style="font-size:20px">
      <v-row  type="flex" justify="start">
          <v-col span="2">
            <v-icon type="global"></v-icon>
          </v-col>
          <v-col span="22">
            <span>{{weather.location}}</span>
          </v-col>
        </v-row>
        <v-row  type="flex" justify="start">
          <span style="font-size:1em">空气质量{{weather.quality}}</span>
          <span>更新时间{{weather.time}}</span>
        </v-row>
    </div>
  </baseCmp>
</template>

<script>
import baseCmp from "../Base.vue";
export default {
  name: "realTimeForecastCmp",
  props: ["cmpConfig"],
  components: {
    baseCmp,
  },
  data() {
    return {
      weather: {
        location:"广东省广州市",
        quality:"优秀",
        time:"14:00"
      },
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
  width: 100%;
  height: 100%;
  font-size: 30px;
}
</style>
