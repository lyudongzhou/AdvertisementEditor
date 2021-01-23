<template>
  <div>
    <div class="sortItems">
      <div class="sortItem" v-for="(item,index) in sortTabConfig" :key="item.text" @click="$emit('sort-click',item,index,sortTabConfig.length)">{{item.text}}<i class="el-icon-arrow-down"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resType: 0,
      orderType: 0,
      priceType: 1,
    };
  },
  props: ['sortTabConfig'],
};
</script>

<style scoped>
.sortItems {
  font-size:14px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sortItem {
  text-align: center;
  width: 33.3%;
  cursor: pointer;
  color: white;
}
</style>>
