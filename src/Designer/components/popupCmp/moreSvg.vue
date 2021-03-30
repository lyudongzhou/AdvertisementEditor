<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="902px"
    :modal-append-to-body="false"
    custom-class="svgDialog"
  >
    <el-container>
      <el-header height="110px">
        <el-container>
          <el-header height="50px">
            <el-tabs
              style="height: 100%"
              v-model="activeName"
              type="card"
              @tab-click="handleClickMiddle"
              class="middleSort"
            >
              <el-tab-pane
                v-for="item in aDetails"
                :key="item.key"
                :label="item.name"
                :name="item.key"
              ></el-tab-pane>
            </el-tabs>
          </el-header>
          <el-main height="59px">
            <el-tabs
              style="height: 100%"
              v-model="sortName"
              type="card"
              class="detailSort"
            >
              <el-tab-pane
                v-for="item in sortItem[activeName]"
                :key="item.key"
                :label="item.name"
                :name="item.key"
              ></el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </el-header>
      <el-main class="svgContainer_main">
        <div class="svgContainer_outter">
          <div
            @click="handleClick(svgMap[activeName][sortName][0].defaultSchema,key,svgMap[activeName][sortName][0].type)"
            v-for="(item, key) in svgMap[activeName][sortName][0].fun"
            :key="key"
            class="svgContainer"
            v-html="item({ layoutConfig: { width: 142, height: 142 } })"
          ></div>
        </div>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script>
import { get } from "@/register";
import { SVGS_DETAIL, REG_TITLECONFIG } from "@/const";
import schemaMixin from "../../mixin/schemaMixin";
const defaultSchema = get(REG_TITLECONFIG);
console.log(defaultSchema);
export default {
  components: {},
  mixins: [schemaMixin],
  data() {
    return {
      dialogVisible: false,
      title: "更多",
      activeName: "shape",
      sortItem: {},
      aDetails: [],
      sortName: "all",
      idMap: {
        "1": "shape",
        "2": "line",
        "3": "decoration",
        "4": "imagewrapper",
      }
    };
  },
  methods: {
    handleClickMiddle() {
      this.sortName = "all";
    },
    handleClick(defaultSchema,index,type) {
      this.dialogVisible = false;
      let schema = JSON.parse(JSON.stringify(defaultSchema));
      schema.props.type = `${type}_${index}`;
      this.$$addNewComponent(schema);
    },
  },
  watch: {},
  /**
  * @param {status} 状态码 1:形状 2:线和箭头 3:装饰 4: 图片容器
  */
  mounted() {
    this.$event.on("openMoreSvg", ({id}) => {
      // todo
      // this.activeName = this.idMap[id];
      console.log(id);
      this.dialogVisible = true;
    });
  },
  created() {
    var detail = get(SVGS_DETAIL);
    this.svgMap = {};
    for (let i in detail) {
      let aAll = [];
      this.aDetails.push({ name: detail[i].name, key: i });
      let map = (this.svgMap[i] = {});
      map.all = aAll;
      this.sortItem[i] = [{ name: "全部", key: "all" }];
      for (let j in detail[i].items) {
        this.sortItem[i].push({
          name: detail[i]["items"][j].name,
          key: j,
        });
        let o = {
          fun: detail[i]["items"][j].fun,
          defaultSchema: detail[i]["items"][j].defaultSchema,
          type:j
        };
        map[j] = [o];
        aAll.push.apply(aAll, [o]);
      }
    }
    console.log(12313, this.svgMap);
    this.sortName = "all";
  },
};
</script>

<style lang="less">
@deep: ~">>>";
.svgDialog {
  .middleSort {
    background: #f5f5f5;
    &.el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs__header {
      border: 1px solid #cdcdcd;
      .el-tabs__nav-wrap {
        margin: 0px;
      }
    }
    /deep/ .el-tabs__item {
      background: transparent;
      border: none;
      width: 100px;
      height: auto;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    /deep/ .el-tabs__item:hover {
      color: #333333;
    }
    /deep/ .el-tabs__item.is-active {
      background: white;
      color: #333333;
      border-left: 1px;
      border-right: 1px;
      border-color: #cdcdcd;
      border-style: solid;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      background: white;
      color: #333333;
      border-right-width: 1px;
      border-color: #cdcdcd;
      border-style: solid;
      border-left-width: 1px;
      border-top: 0px;
      border-bottom: 0px;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active:first-child {
      border-left: none;
    }
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      width: 100%;
      height: 48px;
      background: #f5f5f5;
      border: 1px solid #cdcdcd;
      border-radius: 0;
    }
  }
  .detailSort {
    &.el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs__header {
      border: none;
      margin: 0;
      .el-tabs__nav-wrap {
        margin: 0px;
      }
    }
    background: white;
    /deep/ .el-tabs__item {
      border: 0;
      text-align: center;
      line-height: 38px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      width: 69px;
      height: 38px;
      background: white;
      border-radius: 6px;
    }
    /deep/ .el-tabs__item:hover {
      color: #333333;
    }
    /deep/ .el-tabs__item.is-active {
      background: #ff8533;
      color: white;
    }
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      width: 100%;
      height: 50px;
      background: #f5f5f5;
      border: 1px solid #cdcdcd;
      border-radius: 0;
    }
  }
  border-radius: 5px;
  box-shadow: 3px 11px 13px 0px rgba(144, 144, 144, 0.5);
  .el-dialog__header {
    height: 70px;
    border-radius: 5px;
    background: #f7f7f7;
    padding-left: 33px;
    padding-top: 21px;
    padding-right: 32px;
    .el-dialog__headerbtn {
      font-size: 28px;
      line-height: 28px;
    }
    .el-dialog__title {
      width: 40px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #75838f;
      line-height: 28px;
    }
  }
  .el-dialog__body {
    padding-top: 10px;
    height: 500px;
    .el-container {
      .el-header {
        padding-left: 9px;
        padding-right: 12px;
        .el-container {
          .el-header {
            padding-left: 0px;
            padding-right: 0px;
          }
          .el-main {
            padding: 11px 27px 11px 27px;
            margin-left: 5px;
            margin-right: 4px;
            border-top: 0px;
            border-left: 1px;
            border-right: 1px;
            border-bottom: 1px;
            border-style: solid;
            border-color: #cdcdcd;
            .el-button {
              width: 69px;
              height: 38px;
            }
            .el-button + .el-button {
              margin: 0px;
            }
            .el-button:first-child {
              margin-left: 27px;
            }
          }
        }
      }
      .el-main.svgContainer_main {
        overflow: hidden;
        padding-left: 9px;
        .svgContainer_outter {
          overflow-y: auto;
          height: 340px;
          display: flex;
          flex-wrap: wrap;
          .svgContainer {
            width: 142px;
            height: 142px;
            background: #ffffff;
            border-radius: 5px;
            border: 1px solid #979797;
            margin-left: 28px;
            margin-top: 30px;
            cursor: pointer;
          }
          .svgContainer:nth-child(5n + 1) {
            margin-left: 0px;
          }
          .svgContainer:nth-child(-n + 5) {
            margin-top: 0px;
          }
        }
      }
    }
  }
}
</style>
