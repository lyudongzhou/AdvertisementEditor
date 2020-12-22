<template>
  <div>
    <div class="sortItems">
      <div class="sortItem" v-if="typeSwitch===1" @click="$emit('sort-click',0)">类型<i class="el-icon-arrow-down"></i></div>
      <div class="sortItem" @click="$emit('sort-click',1)">排序<i class="el-icon-arrow-down"></i></div>
      <div class="sortItem" @click="$emit('sort-click',2)">价格<i class="el-icon-arrow-down"></i></div>
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
  props: ['typeSwitch'],
};
</script>

<style scoped>
.sortItems {
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
