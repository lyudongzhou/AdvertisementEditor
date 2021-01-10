<template>
  <div class="infinite-list-wrapper" style="overflow: auto; height: 100%">
    <el-row
      :gutter="20"
      style="margin: 0"
      v-infinite-scroll="loadResource"
      infinite-scroll-disabled="cannotLoad"
      infinite-scroll-immediate="false"
      infinite-scroll-distance="150"
    >
      <el-col
        v-for="(o, index) in aResource"
        :key="index"
        :span="12"
        :style="caculatePadding(index, loadResource.length)"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-container style="height: 100px;position:relative;">
            <el-tooltip placement="right" style="width: 100%; height: 100%">
              <div slot="content">
                <div style="width: 250px; height: 250px">
                  <img
                    v-if="o.resType === 1"
                    :src="o.resUrl"
                    class="image"
                    @click="handleClick(o)"
                  />
                  <video
                    v-if="o.resType === 2"
                    :src="o.resUrl"
                    class="image"
                    @click.capture="handleClick(o)"
                    @click="handleClick1()"
                  ></video>
                  <div
                    @click="handleClick(o, arguments[0])"
                    style="position: relative"
                  >
                    <div
                      style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                      "
                    ></div>
                    <iframe
                      v-if="o.resType === 4"
                      :src="o.resUrl"
                      class="image"
                    ></iframe>
                  </div>
                  <img v-if="o.bodyJson" :src="o.thumbnail" class="image" />
                </div>
              </div>
              <div>
                <img
                  v-if="o.resType === 1"
                  :src="o.resUrl"
                  class="image"
                  @click="handleClick(o)"
                />
                <video
                  v-if="o.resType === 2"
                  :src="o.resUrl"
                  class="image"
                  @click.capture="handleClick(o)"
                  @click="handleClick1()"
                ></video>

                <div
                  @click="handleClick(o, arguments[0])"
                  style="position: relative"
                >
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0;
                      top: 0;
                    "
                  ></div>
                  <iframe
                    v-if="o.resType === 4"
                    :src="o.resUrl"
                    class="image"
                  ></iframe>
                </div>
                <img v-if="o.bodyJson" :src="o.thumbnail" class="image" />
              </div>
            </el-tooltip>
            <img
            v-if="o.priceType!==0"
              :src="clownImage"
              style="
                position: absolute;
                width: 30px;
                height: 30px;
                top: 0;
                left: 0;
              "
            />
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
import image from "../public/58.png";
const config = get(REG_TITLECONFIG);
export default {
  props: ["sortConfig", "typeSwitch"],
  mixins: [schemaMixin, dataMixin],
  watch: {
    sortConfig() {
      console.log(111);
      this.reset();
      this.loadResource();
    },
    typeSwitch(type) {
      console.log(type);
      if (type === 1) {
        this.url = "/res/get";
      } else {
        this.url = "program/list";
      }
      this.reset();
      this.loadResource();
    },
  },
  created() {
    this.loadResource();
    this.clownImage = image;
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
    handleClick(o, e) {
      console.log("capture");
      if (this.typeSwitch === 1) {
        if (o.resType === 1) {
          let defaultSchema = config["ImageCmp"][0].defaultSchema;
          console.log(o);
          defaultSchema.props.bgUrl = o.resUrl;
          this.$$addNewComponent(defaultSchema);
        } else if (o.resType === 2) {
          let defaultSchema = config["VideoCmp"][0].defaultSchema;
          defaultSchema.props.bgUrl = o.resUrl;
          this.$$addNewComponent(defaultSchema);
          // TODO: simulate bodyJson
        } else if (o.resType === 4) {
          let defaultSchema = config["documentCmp"][0].defaultSchema;
          defaultSchema.props.url = o.resUrl;
          this.$$addNewComponent(defaultSchema);
        }
      } else {
        this.resetSchema(o.bodyJson);
      }
      if (e) {
        e.preventDefault();
      }
    },
    handleClick1() {
      console.log("bubble");
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
