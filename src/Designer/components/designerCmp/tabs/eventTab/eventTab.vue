<template>
  <div class="eventContainer">
    <div class="title">点击事件</div>
    <ul class="eventTabList">
      <li
        :class="{ checkItem: true, select: 0 === dataCurrentSelect }"
        @click="onChangeCurrentSelect(0)"
      >
        无效果
      </li>
      <li
        :class="{ checkItem: true, select: 1 === dataCurrentSelect }"
        @click="onChangeCurrentSelect(1)"
      >
        <img :src="opendialogIcon" class="eventIcon" />
        打开弹窗
      </li>
      <li
        :class="{ checkItem: true, select: 2 === dataCurrentSelect }"
        @click="onChangeCurrentSelect(2)"
      >
        <img :src="openwindowIcon" class="eventIcon"  />
        跳转页面
      </li>
      <div>
        <div
          v-show="dataCurrentSelect === 1"
          style="margin-top: 10px; color: white"
        >
          <span>无接触返回时长</span>
          <el-input
            size="mini"
            v-show="!dialogChecked"
            v-model="dataDialogBackTime"
            style="width: 50px"
          ></el-input>
          <span v-show="!dialogChecked">秒</span>
          <el-checkbox v-model="dialogChecked" style="color: white"
            >自动计算</el-checkbox
          >
        </div>
        <div
          v-show="dataCurrentSelect === 1"
          style="margin-top: 10px; color: black"
        >
          <el-select
            size="small"
            v-model="dataDialogValue"
            placeholder="请选择跳转的页面"
            filterable
            style="width: 100%"
            :clearable="true"
          >
            <el-option
              v-for="item in dialogs"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              style="
                height: 100px;
                width: 300px;
                display: flex;
                justify-content: left;
                align-items: center;
              "
            >
              <span style="float: left; color: black">{{ item.name }}</span>
              <span
                style="
                  display: inline-block;
                  width: 200px;
                  height: 90px;
                  margin-left: 10px;
                "
                ><snapShotDisplay :id="item.id"></snapShotDisplay
              ></span>
            </el-option>
          </el-select>
        </div>
        <div
          v-show="dataCurrentSelect === 2"
          style="margin-top: 10px; color: black"
        >
          <span
            style="display: inline-block; width: 50px; text-align: center"
            :class="caculatePageClass()"
            @click="onChangeWindowNextPage(true)"
            >下一页</span
          >
          <el-select
            size="small"
            v-model="dataWindowValue"
            placeholder="请选择跳转的页面"
            filterable
            style="width: 70%; margin-left: 10px"
            :clearable="true"
          >
            <el-option
              v-for="item in pages"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              style="
                height: 100px;
                width: 300px;
                display: flex;
                justify-content: left;
                align-items: center;
              "
            >
              <span style="float: left; color: black">{{ item.name }}</span>
              <span
                style="
                  display: inline-block;
                  width: 200px;
                  height: 90px;
                  margin-left: 10px;
                "
                ><snapShotDisplay
                  :id="item.id"
                  :useCache="true"
                ></snapShotDisplay
              ></span>
            </el-option>
          </el-select>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import "../../editors";
import { get } from "@/register";
import { REG_EDITORS } from "@/const";
import { mapGetters, mapMutations } from "../../../../store";
import snapShotDisplay from "../../../snapShotDisplay";
import { UPDATE_COMPONENT_PROPS } from "../../../../constant/schema";
import { getPropByPath } from "@/utils";
import opendialogIcon from "../../../../public/opendialog.png";
import openwindowIcon from "../../../../public/openwindow.png";
// import opendialogIcon from "../../../../public/opendialog.png"
export default {
  name: "eventTab",
  components: {
    ...get(REG_EDITORS),
    snapShotDisplay,
  },
  props: ["configData", "config"],
  created() {
    this.opendialogIcon = opendialogIcon;
    this.openwindowIcon = openwindowIcon;
  },
  computed: {
    ...mapGetters(["pages", "dialogs"]),
    dataCurrentSelect() {
      let config = this.configData.events[0];
      if (!config) {
        return 0;
      }
      if (config.type === "openTheWindow") {
        return 2;
      } else if (config.type === "openTheDialog") {
        return 1;
      } else if (config.type === "nextPage") {
        return 2;
      } else {
        return 0;
      }
    },
    dataDialogBackTime: {
      get() {
        let config = getPropByPath(this.configData, "events.0");
        if (!config || config.type !== "openTheDialog") {
          return "";
        }
        return config.props.backTime;
      },
      set(para) {
        this.onChangeDialogBackTime(para);
      },
    },
    dataDialogValue: {
      get() {
        let config = getPropByPath(this.configData, "events.0");
        if (!config || config.type !== "openTheDialog") {
          return "";
        }
        return config.props.openId;
      },
      set(value) {
        this.onChangeDialogValue(value);
      },
    },
    dataWindowValue: {
      get() {
        let config = getPropByPath(this.configData, "events.0");
        if (!config || config.type !== "openTheWindow") {
          return "";
        }
        return config.props.openId;
      },
      set(value) {
        this.onChangeWindowValue(value);
      },
    },
    dataWindowNextPage: {
      get() {
        let config = getPropByPath(this.configData, "events.0");
        if (!config || config.type !== "nextPage") {
          return false;
        }
        return true;
      },
      set(value) {
        this.onChangeWindowNextPage(value);
      },
    },
  },
  watch: {
    dialogChecked(value) {
      if (!this.isReady) {
        return;
      }
      this.onChangeDialogChecked(value);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true;
    });
  },
  data() {
    return {
      dialogChecked: false,
      isReady: false,
    };
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    caculatePageClass() {
      return { nextPage: true, select: this.dataWindowNextPage };
    },
    onChangeCurrentSelect(data) {
      if (!this.isReady) {
        return;
      }
      let arr = this.configData.events;
      switch (data) {
        case 0:
          this.updateSchema({
            type: UPDATE_COMPONENT_PROPS,
            value: {
              ["events.0"]: {
                type: "log",
                props: {},
              },
            },
          });
          break;
        case 1:
          this.updateSchema({
            type: UPDATE_COMPONENT_PROPS,
            value: {
              ["events.0"]: {
                type: "openTheDialog",
                props: {
                  openId: this.dataDialogValue,
                  backTime: this.dialogChecked ? 3 : this.dataDialogBackTime,
                },
              },
            },
          });
          break;
        case 2:
          while (arr.length) {
            arr.pop();
          }
          if (this.dataWindowNextPage) {
            this.updateSchema({
              type: UPDATE_COMPONENT_PROPS,
              value: {
                ["events.0"]: {
                  type: "nextPage",
                  props: {},
                },
              },
            });
          } else {
            this.updateSchema({
              type: UPDATE_COMPONENT_PROPS,
              value: {
                ["events.0"]: {
                  type: "openTheWindow",
                  props: {
                    openId: this.dataWindowValue,
                    backTime: 1,
                  },
                },
              },
            });
          }
          break;
      }
    },
    onChangeDialogBackTime(data) {
      if (!this.isReady) {
        return;
      }
      if (data !== null) {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          value: {
            ["events.0"]: {
              type: "openTheDialog",
              props: {
                openId: this.dataDialogValue,
                backTime: data,
              },
            },
          },
        });
      }
    },
    onChangeDialogChecked(data) {
      if (!this.isReady) {
        return;
      }
      if (data) {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          value: {
            ["events.0"]: {
              type: "openTheDialog",
              props: {
                openId: this.dataDialogValue,
                backTime: 3,
              },
            },
          },
        });
      }
    },
    onChangeDialogValue(data) {
      if (!this.isReady) {
        return;
      }
      this.updateSchema({
        type: UPDATE_COMPONENT_PROPS,
        value: {
          ["events.0"]: {
            type: "openTheDialog",
            props: {
              openId: data,
              backTime: this.dialogChecked ? 3 : this.dataDialogBackTime,
            },
          },
        },
      });
    },
    onChangeWindowValue(data) {
      if (!this.isReady) {
        return;
      }
      if (data && data !== "") {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          value: {
            ["events.0"]: {
              type: "openTheWindow",
              props: {
                openId: data,
                backTime: 1,
              },
            },
          },
        });
      }
    },
    onChangeWindowNextPage(data) {
      if (!this.isReady) {
        return;
      }
      if (data) {
        this.updateSchema({
          type: UPDATE_COMPONENT_PROPS,
          value: {
            ["events.0"]: {
              type: "nextPage",
              props: {},
            },
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scope>
.eventIcon{
  width:35px;
  height:35px;
}
.selectIcon {
  width: 50px;
  height: 50px;
}
.title {
  color: white;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 22px;
}
.nextPage {
  color: black;
  background-color: white;
}
.nextPage.select {
  color: white;
  background-color: gray;
}
.eventContainer {
  padding: 16px 13px 16px 21px;
}
.eventTabList {
  display: flex;
  flex-wrap: wrap;
  color: white;
  background-color: transparent;
}
.eventTabList {
  li {
    width: 78px;
    height: 78px;
    background: #545454;
    border-radius: 5px;
    border: 1px solid #979797;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  li:hover {
    background: #999999;
  }
  li.select {
    background: #999999;
  }
}
.basic_tab {
  .el-form {
    .el-form-item:last-child {
      margin: 0;
    }
  }
}
</style>
