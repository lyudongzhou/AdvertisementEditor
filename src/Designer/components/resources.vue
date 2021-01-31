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
          <el-container style="height: 100px; position: relative">
            <el-tooltip placement="right" style="width: 100%; height: 100%">
              <div slot="content">
                <div style="width: 250px; height: 250px">
                  <img
                    v-if="o.resType === 1"
                    :src="o.sourcePaht"
                    class="image"
                    @click="handleClick(o)"
                  />
                  <video
                    v-if="o.resType === 2"
                    :src="o.sourcePaht"
                    class="image"
                    @click.capture="handleClick(o)"
                    @click="handleClick1()"
                  ></video>
                  <div
                    @click="handleClick(o, arguments[0])"
                    style="position: relative"
                    v-if="o.resType === 4"
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
                    <img :src="o.imgList[0]" class="image" />
                  </div>
                  <img v-if="o.body" :src="o.thumbnail" class="image" />
                </div>
              </div>
              <div>
                <img
                  v-if="o.resType === 1"
                  :src="o.sourcePaht"
                  class="image"
                  @click="handleClick(o)"
                />
                <img
                  v-if="o.resType === 2"
                  :src="o.thumbnail"
                  class="image"
                  @click.capture="handleClick(o)"
                  @click="handleClick1()"
                />

                <div
                  v-if="o.resType === 4"
                  @click="handleClick(o, arguments[0])"
                  style="position: relative; width: 100%; height: 100%"
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
                  <img :src="fireImage" class="image" />
                </div>
                <img v-if="o.body" :src="o.thumbnail" class="image" />
              </div>
            </el-tooltip>
            <img
              v-if="o.isVip !== 0"
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
import fileIcon from "../public/file.jpg";

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
    this.fireImage = fileIcon;
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
      var isVip;
      try {
        isVip =
          JSON.parse(window.localStorage.getItem("saber-userInfo")).content
            .memberType === 1;
      } catch (e) {
        console.log("vipCatchErr");
        isVip = true;
      }
      if (!isVip && o.isVip !== 0) {
        this.$alert("成为会员即可免费哦。", {
          confirmButtonText: "确定",
        });
        return;
      }
      console.log(o);
      if (this.typeSwitch === 1) {
        if (o.resType === 1) {
          let defaultSchema = config["ImageCmp"][0].defaultSchema;
          // console.log(o);
          defaultSchema.props.bgUrl = [o.sourcePaht];
          defaultSchema.props.introduce = [o.resName];
          this.$$addNewComponent(defaultSchema);
        } else if (o.resType === 2) {
          let defaultSchema = config["VideoCmp"][0].defaultSchema;
          defaultSchema.props.bgUrl = o.sourcePaht;
          this.$$addNewComponent(defaultSchema);
          // TODO: simulate body
        } else if (o.resType === 4) {
          let defaultSchema = config["documentCmp"][0].defaultSchema;
          defaultSchema.props.bgUrl = o.imgList;
          this.$$addNewComponent(defaultSchema);
        }
      } else {
        this.resetSchema(o.body);
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
