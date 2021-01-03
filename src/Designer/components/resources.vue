<template>
  <div class="infinite-list-wrapper" style="overflow: auto; height: 100%">
    <el-row
      :gutter="20"
      style="margin: 0"
      v-infinite-scroll="loadResource"
      infinite-scroll-disabled="cannotLoad"
      infinite-scroll-immediate=false
      infinite-scroll-distance=150
    >
      <el-col
        v-for="(o, index) in aResource"
        :key="index"
        :span="12"
        :style="caculatePadding(index, loadResource.length)"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-container style="height: 100px">
            <img
              v-if="o.resType === 1"
              :src="o.resUrl"
              class="image"
              @click="handleClick(o)"
            />
            <img
               v-if="o.bodyJson"
               :src="o.thumbnail"
               class="image"
               @click="handleClick(o)" />
          </el-container>
        </el-card>
      </el-col>
      <p v-if="isLoading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </el-row>
  </div>
</template>

<script>
import schemaMixin from "../mixin/schemaMixin";
import dataMixin from "../mixin/pagingResourceMixin";
import { mapMutations } from "../store";
import { get } from "@/register";
import { REG_TITLECONFIG } from "@/const";
const config = get(REG_TITLECONFIG);
export default {
  props: ["sortConfig", "typeSwitch"],
  mixins: [schemaMixin,dataMixin],
  watch: {
    sortConfig() {
      console.log(111);
      this.reset();
      this.loadResource();
    },
    typeSwitch (type) {
      console.log(type);
      if(type===1){
        this.url = "/res/get";
      }else{
        this.url = "program/list";
      }
      this.reset();
      this.loadResource();
    },
  },
  created() {
    this.loadResource();
  },
  methods: {
    ...mapMutations(["resetSchema"]),
    caculatePadding(index, count) {
      return {
        "padding-left": index % 2 === 1 ? "5px" : "10px",
        "padding-right": index % 2 === 0 ? "5px" : "10px",
        "padding-top": index < 2 ? "10px" : 0,
        "padding-bottom": count - index < 2 ? 0 : "10px",
      };
    },
    handleClick(o) {
      if (this.typeSwitch === 1) {
        let defaultSchema = config["ImageCmp"][0].defaultSchema;
        console.log(o);
        defaultSchema.props.bgUrl = o.resUrl;
        this.$$addNewComponent(defaultSchema);
      } else {
        // TODO: simulate bodyJson
        this.resetSchema(o.bodyJson);
      }
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
