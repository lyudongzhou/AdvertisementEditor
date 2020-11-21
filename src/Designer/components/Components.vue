<template>
  <div class="flex-container content-center">
    <ul>
      <li v-for="config in headJson" :key="config.label">
        <i><img :src="config.icon" alt="" /></i>
        <span>{{config.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import headJson from '../config/headJson.json';

  export default {
    name: 'components',
    components: {
    },
    created() {
      this.headJson = headJson;
    },
    data() {
      return {
      };
    }
  }
</script>

<style lang="less" scoped>
  .flex-container {
    width: 100%;
    height: 55px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        i {
          padding-right: 6px;
        }
      }
    }
  }
</style>
