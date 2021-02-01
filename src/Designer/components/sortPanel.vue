<template>
  <div class="sortContainer" @mouseleave="$emit('mouse-leave')">
    <div
      v-if="sortType.length === 0"
      style="width: 100%; height: 100%; position: relative"
    >
      <div class="sortItem" @mouseover="handleOver('industryList')">
        行业<i class="el-icon-caret-right"></i>
      </div>
      <div class="sortItem" @mouseover="handleOver('purposeList')">
        用途<i class="el-icon-caret-right"></i>
      </div>
      <div class="subSortPanel" v-if="currentSelect === 'industryList'">
        <div
          v-for="(cmp, index) in industryList"
          :key="index"
          :class="fmtClass(cmp.value)"
          @click="onClick(cmp.id)"
        >
          {{ cmp.name }}
        </div>
      </div>
      <div class="subSortPanel" v-if="currentSelect === 'purposeList'">
        <div
          v-for="(cmp, index) in purposeList"
          :key="index"
          :class="fmtClass(cmp.value)"
          @click="onClick(cmp.id)"
        >
          {{ cmp.name }}
        </div>
      </div>
    </div>

    <div
      v-for="(cmp, index) in sortType"
      :key="index"
      :class="fmtClass(cmp.value)"
      @click="onClick(cmp.value)"
    >
      {{ cmp.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["property", "sortType", "select", "type", "targetType"],
  methods: {
    onClick(value) {
      console.log(this.property, value);
      this.$emit("sort-config-change", this.property, value);
    },
    fmtClass(index) {
      return {
        sortItem: true,
        active: this.select === index,
      };
    },
    getResources(o) {
      return new Promise((resolve) => {
        this.$axios.get("/label/get", o).then(resolve);
      });
    },
    handleOver(name) {
      console.log("over");
      this.currentSelect = name;
    },
  },
  created() {
    console.log("1111123",this.type,this.targetType);
    this.getResources({type:this.type,targetType:this.targetType}).then((res) => {
      res.data[0].forEach((ele) => {
        this.industryList.push(ele);
      });
      res.data[1].forEach((ele) => {
        this.purposeList.push(ele);
      });
    });
  },
  data() {
    return {
      currentSelect: "industryList",
      industryList: [],
      purposeList: [],
    };
  },
};
</script>

<style scoped>
.subSortPanel {
  position: absolute;
  width: 100px;
  display: flex;
  flex-wrap: wrap;
  max-height: 200px;
  left: 100px;
  background: white;
  top: 0px;
  overflow-y: auto;
}
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
