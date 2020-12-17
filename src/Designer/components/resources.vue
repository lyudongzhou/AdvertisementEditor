<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-13 19:00:38
 * @LastEditTime: 2020-12-17 07:01:39
 * @Description: file content
-->
<template>
  <div class="infinite-list-wrapper" style="overflow: auto; height: 100%">
    <el-row
      :gutter="20"
      style="margin: 0"
      v-infinite-scroll="load"
      infinite-scroll-disabled="cannotLoad"
      infinite-scroll-distance=150
    >
      <el-col
        v-for="(o, index) in data"
        :key="index"
        :span="12"
        :style="caculatePadding(index, data.length)"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-container style="height: 100px">
            <img
              v-if="o.resType === 1"
              :src="o.resUrl"
              class="image"
              @click="handleClick(o)"
            />
          </el-container>
        </el-card>
      </el-col>
      <p v-if="isLoading">加载中...</p>
      <p v-if="total < loadCount * currentPage">没有更多了</p>
    </el-row>
  </div>
</template>

<script>
import schemaMixin from "../mixin/schemaMixin";
import { get } from "@/register";
import { REG_TITLECONFIG } from "@/const";
const config = get(REG_TITLECONFIG);
export default {
  props: ["sortConfig"],
  mixins: [schemaMixin],
  computed: {
    cannotLoad() {
      console.log("canload", this.total, this.loadCount, this.currentPage);
      if (this.total === undefined) {
        return this.isLoading;
      } else {
        return (
          this.isLoading || this.total < this.loadCount * this.currentPage
        );
      }
    },
  },
  data() {
    return {
      data: [],
      loadCount: 10,
      currentPage: 1,
      isLoading: false,
      loadId: 0,
      total: undefined,
    };
  },
  watch: {
    sortConfig() {
      this.reload();
    },
  },
  created() {
    this.currentPage = 1;
    this.loadCount = 20;
    this.get().then(this.generateLoadFun());
    this.currentPage = 2;
    this.loadCount = 10;
    window.abc = this;
  },
  methods: {
    reload() {
      this.total = undefined;
      this.currentPage = 1;
      this.loadCount = 20;
      while (this.data.length) {
        this.data.pop();
      }
      this.loadId++;
      this.get().then(this.generateLoadFun());
      this.currentPage = 2;
      this.loadCount = 10;
    },
    caculatePara() {
      let para = {};
      Object.assign(para, this.sortConfig, {
        current: this.currentPage,
        size: this.loadCount,
      });
      console.log(para);
      return para;
    },
    load() {
      if (this.isLoading) {
        return;
      }
      this.currentPage++;
      this.get().then(this.generateLoadFun());
    },
    generateLoadFun() {
      let loadId = this.loadId;
      return (res) => {
        if (this.loadId === loadId) {
          this.onLoad(res);
        }
      };
    },
    onLoad(res) {
      res.data.resources.forEach((ele) => {
        this.data.push(ele);
      });
      console.log(res.data.resources.length);
      this.isLoading = false;
      this.total = res.data.total;
    },
    caculatePadding(index, count) {
      return {
        "padding-left": index % 2 === 1 ? "5px" : "10px",
        "padding-right": index % 2 === 0 ? "5px" : "10px",
        "padding-top": index < 2 ? "10px" : 0,
        "padding-bottom": count - index < 2 ? 0 : "10px",
      };
    },
    handleClick(o) {
      let defaultSchema = config["ImageCmp"][0].defaultSchema;
      defaultSchema.props.bgUrl = o.src;
      this.$$addNewComponent(defaultSchema);
    },
    get() {
      this.isLoading = true;
      return this.$axios.get("/res/get", this.fmtParams(this.caculatePara()));
    },
    fmtParams({
      resType = 0,
      userId = 0,
      current = 1,
      size = 20,
      orderType = 0,
      priceType = 1,
      type = 1,
    }) {
      return { resType, userId, current, size, orderType, priceType, type };
    },
  },
};
</script>

<style scope lang="less">
.el-row {
  margin: 0;
}
.el-col {
  border-radius: 4px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
