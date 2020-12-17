<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-17 02:57:42
 * @LastEditTime: 2020-12-17 06:16:52
 * @Description: file content
-->
<template>
  <div class="sortContainer" @mouseleave="$emit('mouse-leave')">
    <div
      v-for="(cmp, index) in sortTypeMap[sortType]"
      :key="index"
      :class="fmtClass(cmp.value)"
      @click="onClick(sortType, cmp.value)"
    >
      {{ cmp.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["sortType","select"],
  methods: {
    onClick(type, value) {
      this.$emit("sort-config-change", type, value);
    },
    fmtClass(index){
        return {
            sortItem:true,
            active:this.select===index
        }
    }
  },
  data() {
    return {
      sortTypeMap: {
        0: [
          {
            label: "全部",
            value: 0,
          },
          {
            label: "图片",
            value: 1,
          },
          {
            label: "视频",
            value: 2,
          },
          {
            label: "音频",
            value: 3,
          },
          {
            label: "文档",
            value: 4,
          },
        ],
        1: [
          {
            label: "默认",
            value: 0,
          },
          {
            label: "最新",
            value: 1,
          },
          {
            label: "精选",
            value: 2,
          },
        ],
        2: [
          {
            label: "免费",
            value: 1,
          },
          {
            label: "会员免费",
            value: 2,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.sortContainer {
  display: flex;
  position: absolute;
  width: 100px;
  background-color: white;
  flex-wrap: wrap;
}
.sortItem:first-child {
  padding-top: 10px;
}
.sortItem:last-child {
  padding-bottom: 10px;
}
.sortItem {
  padding: 5px 0 5px 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
}
.sortItem:hover {
  background-color: #aeaeae;
}
.sortItem.active {
  background-color: #aeaeae;
}
</style>
