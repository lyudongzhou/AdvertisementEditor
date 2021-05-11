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
        <el-card
          :body-style="{ padding: '0px', width: '93px', height: '93px' }"
          style="width: 93px; height: 93px"
          shadow="hover"
        >
          <el-container style="height: 93px; width: 93px; position: relative">
            <el-tooltip
              :disabled="tipDisable"
              placement="right"
              style="width: 100%; height: 100%"
              :popper-class="'draw_share_atooltip1'"
              :visible-arrow="false"
            >
              <div slot="content" style="">
                <div style="text-align: center">
                  <img
                    v-if="o.resType === 1"
                    :src="o.sourcePaht"
                    class="image-full"
                  />
                  <video
                    v-if="o.resType === 2"
                    :src="o.sourcePaht"
                    class="image-full"
                  ></video>
                  <div
                    style="position: relative; display: flex"
                    v-if="o.resType === 4"
                  >
                    <div
                      style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        margin: auto;
                      "
                    ></div>
                    <img :src="o.imgList[0]" class="image-full" />
                  </div>
                  <img v-if="o.body" :src="o.thumbnail" class="image-full" />
                  <div
                    v-if="o.isVip !== 1 && sortConfig.type === 2"
                    class="preText"
                  >
                    免费
                  </div>
                  <el-button
                    class="useImmdiatly"
                    type="programConfig"
                    @click="handleClick(o)"
                    >立即使用</el-button
                  >
                </div>
              </div>
              <div>
                <img v-if="o.resType === 1" :src="o.sourcePaht" class="image" />
                <img v-if="o.resType === 2" :src="o.thumbnail" class="image" />

                <div
                  v-if="o.resType === 4"
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
              v-if="o.isVip !== 1 && sortConfig.type === 2 && o.priceType !== 1"
              :src="clownImage"
              style="position: absolute; left: 4px; top: 3px"
            />
          </el-container>
        </el-card>
      </el-col>
      <div style="float: left; padding: 10px; color: white; width: 100%">
        <p v-if="isLoading">加载中...</p>
        <p v-if="!isLoading && noMore" style="color: white">没有更多了</p>
      </div>
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
  data() {
    return {
      tipDisable: false,
    };
  },
  watch: {
    sortConfig() {
      this.reset();
      this.loadResource();
    },
    typeSwitch(type) {
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
  mounted() {
    console.log(this.sortConfig, this.typeSwitch);
  },
  methods: {
    ...mapMutations(["resetSchema"]),
    caculatePadding(index, count) {
      return {
        "padding-left": index % 2 === 1 ? "0px" : "0px",
        "padding-right": index % 2 === 0 ? "0px" : "0px",
        "padding-top": index < 2 ? 0 : "6px",
        "padding-bottom": count - index < 2 ? 0 : "6px",
      };
    },
    handleClick(o, e) {
      this.tipDisable = true;
      // this.$nextTick(()=>{
      //   this.tipDisable = false;
      // });
      setTimeout(() => {
        this.tipDisable = false;
      }, 1000);
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
      if (!isVip && o.isVip !== 1 && this.sortConfig.type === 2) {
        this.$alert("成为会员即可免费哦。", {
          confirmButtonText: "确定",
        });
        return;
      }
      if (this.typeSwitch === 1) {
        if (o.resType === 1) {
          let defaultSchema = config["ImageCmp"][0].defaultSchema;
          // console.log(o);
          defaultSchema.props.bgUrl = [o.sourcePaht];
          defaultSchema.props.introduce = [o.resName];
          defaultSchema.props.arrResources = [
            {
              name: o.resName,
              uuid: o.uuid,
              url: o.sourcePaht,
              payload: o,
            },
          ];
          this.$$addNewComponent(defaultSchema);
        } else if (o.resType === 2) {
          let defaultSchema = config["VideoCmp"][0].defaultSchema;
          defaultSchema.props.bgUrl = [o.sourcePaht];
          defaultSchema.props.arrResources = [
            {
              name: o.resName,
              uuid: o.uuid,
              url: o.sourcePaht,
              payload: o,
            },
          ];
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
  },
};
</script>

<style scope lang="less">
.useImmdiatly {
  width: 218px;
  height: 36px;
  background: #1793ff;
  border-radius: 5px;
  color: white !important;
}
.preText {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #1793ff;
  line-height: 20px;
  margin-left: 200px;
  margin-top: 13px;
  margin-bottom: 9px;
}
.image-full {
  width: 226px;
  height: 143px;
  margin: auto;
  margin-top: 40px;
}
.draw_share_atooltip {
  width: 240px;
  height: 272px;
  padding: 0px !important;
  transform: translate(108px, 0);
  background-color: #fff !important;
}
.draw_share_atooltip1 {
  width: 240px;
  height: 272px;
  padding: 0px !important;
  // transform: translate(11px, 0);
  background-color: #fff !important;
}
.el-row {
  margin: 0;
}
.el-col {
  border-radius: 9px;
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
  width: 87px;
  height: 57px;
  display: block;
  margin: 22px auto 14px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.nomore {
  text-align: center;
  padding-top: 10px;
  color: #999;
}
</style>
