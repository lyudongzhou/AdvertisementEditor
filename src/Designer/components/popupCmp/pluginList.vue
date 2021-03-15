<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="902px"
    :modal-append-to-body="false"
    custom-class="pluginDialog"
  >
    <el-container>
      <el-header height="38px"> </el-header>
      <el-main class="svgContainer_main">
        <el-table
          :data="tableData"
          height="276"
          border
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="createDate" label="创建时间">
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          @current-change="pageChange"
          style="text-align: center"
          layout="prev, pager, next"
          :total="totalSize"
        >
        </el-pagination>
      </el-main>
      <el-footer>
        <el-button class="cancel" @click="handelCancel">取消</el-button>
        <el-button class="commit" @click="handelClick">确定</el-button>
      </el-footer>
    </el-container>
  </el-dialog>
</template>

<script>
import schemaMixin from "../../mixin/schemaMixin";
export default {
  components: {},
  mixins: [schemaMixin],
  data() {
    return {
      sortType: 1,
      dialogVisible: false,
      title: "表单",
      activeName: "shape",
      sortItem: {},
      aDetails: [],
      sortName: "all",
      tableData: [],
      totalSize: 0,
      currentPage: 1,
    };
  },
  methods: {
    handelCancel() {
      this.dialogVisible = false;
    },
    handelClick() {
      // this.currentConfig = {
      //   editConfig: {
      //     name: "表单",
      //     position: "4.0.1",
      //     defaultSchema: {
      //       type: "formCmp",
      //       layoutConfig: {
      //         width: 780,
      //         height: 350,
      //       },
      //       props: {
      //         id: "1",
      //       },
      //       animation: [],
      //       events: [],
      //       children: [],
      //     },
      //   },
      // };
      // let data = {
      //   code: 200,
      //   success: true,
      //   msg: "操作成功",
      //   data: {
      //     formPlugin: {
      //       formName: "表单插件",
      //       formStartDate: "2021-01-01",
      //       formfinishDate: "2021-01-01",
      //       component: [
      //         {
      //           compoType: 1,
      //           compoIndex: 1,
      //           text: "单行文本",
      //         },
      //         {
      //           compoType: 2,
      //           compoIndex: 2,
      //           text: "多行文本",
      //         },
      //         {
      //           compoType: 3,
      //           compoIndex: 3,
      //           option: ["选项 1", "选项 2", "选项 3"],
      //           text: "文本1",
      //         },
      //         {
      //           compoType: 4,
      //           compoIndex: 4,
      //           option: ["选项 1", "选项 2", "选项 3"],
      //           text: "文本2",
      //         },
      //         {
      //           compoType: 5,
      //           compoIndex: 5,
      //           option: ["选项 1", "选项 2", "选项 3"],
      //           text: "文本3",
      //         },
      //       ],
      //       buttonText: "点击提交",
      //       clickText: "感谢提交",
      //     },
      //   },
      // };
      // let schema = this.currentConfig.editConfig.defaultSchema;
      // schema.props.data = data.data.formPlugin;
      // this.$$addNewComponent(schema);
      // this.handelCancel();
      // return;
      if (this.current) {
        console.log(this.current);
        this.$axios
          .get("/plugin/pluginDetail", {
            pluginId: this.current.id,
            type: this.title === "投票" ? 1 : 2,
          })
          .then((data) => {
            // if (data.data.formPlugin) {
            //   data.data.formPlugin.id = this.current.id;
            // } else {
            //   data.data.votePlugin.id = this.current.id;
            // }
            if (this.type === "投票") {
              let schema = this.currentConfig.editConfig.defaultSchema;
              schema.props.data = data.data;
              this.$$addNewComponent(schema);
            } else {
              let schema = this.currentConfig.editConfig.defaultSchema;
              schema.props.data = data.data;
              this.$$addNewComponent(schema);
            }
            this.handelCancel();
            // this.$$addNewComponent({});
          });
      } else {
        this.$alert("请选择一个" + this.title, "错误", {
          confirmButtonText: "确定",
        });
      }
    },
    pageChange() {},
    getData() {
      return new Promise((resolve) => {
        this.$axios.get("/plugin/list", this.fmtParams()).then((res) => {
          //   console.log(res);
          this.tableData = res.data.records;
          this.totalSize = Math.ceil(res.data.total / 10);
          resolve();
        });
      });
    },
    fmtParams() {
      return {
        type: this.sortType,
        current: this.currentPage,
        size: 10,
      };
    },
    handleCurrentChange(val) {
      this.current = val;
      // console.log(val);
    },
  },
  watch: {},
  mounted() {
    this.$event.on("selectPlugin", (type, config) => {
      this.currentConfig = config;
      // console.log(this.currentConfig);
      this.dialogVisible = true;
      this.current = null;
      this.title = type === 1 ? "投票" : "表单";
      this.sortType = type===1?1:2;
      this.tableData = [];
      this.getData();
    });
  },
  created() {
    // this.getData();
  },
};
</script>

<style lang="less">
@deep: ~">>>";
.pluginDialog {
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
      .el-footer {
        text-align: center;
        .cancel {
          width: 120px;
          height: 40px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #1391ff;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1391ff;
        }
        .commit {
          margin-left: 38px;
          width: 120px;
          height: 40px;
          background: #1391ff;
          border-radius: 10px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .el-main.svgContainer_main {
        overflow: hidden;
        padding-left: 76px;
        padding-top: 28px;
        padding-bottom: 47px;
        .el-table--border,
        .el-table--group {
          border-radius: 10px;
          border: 1px solid #979797;
        }
      }
    }
  }
}
</style>
