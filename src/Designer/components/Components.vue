<template>
  <div class="flex-container content-center">
    <ul>
      <li v-for="(config, index) in headConfig" :key="config.label">
        <div v-if="config.children.length > 0">
          <i><img :src="config.icon" alt="" /></i>
          <span>{{ config.label }}</span>
          <div class="frame" ref="frame">
            <!-- <div class="arrow"></div> -->
            <div
              :class="
                index < headConfig.length - 2
                  ? 'frame_content_h'
                  : 'frame_content_l'
              "
            >
              <div class="list" v-for="msg in config.children" :key="msg.id">
                <p class="frame_title">{{ msg.label }}</p>
                <ol class="frame_list" v-if="index < headConfig.length - 1">
                  <li
                    v-for="child in msg.children"
                    :key="child.id"
                    @click="addCmp(child)"
                  >
                    <i><img :src="child.icon" /></i>
                    <span>{{ child.label }}</span>
                  </li>
                </ol>
                <ol class="frame_list" v-else>
                  <li
                    v-for="child in msg.children"
                    :key="child.id"
                    @click="addCmp(child)"
                  >
                    <div class="svgContainer" v-html="tmpSvg(child)"></div>
                  </li>
                </ol>
                <p class="more_btn" v-if="index >= headConfig.length - 1">
                  <b @click="moreSvg(msg.id)">更多</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else @click="addCmp(config)">
          <i><img :src="config.icon" alt="" /></i>
          <span>{{ config.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import headConfig from "../config/headerConfig";
import schemaMixin from "../mixin/schemaMixin";
import { get } from "@/register";
import { SVGS } from "@/const";
import { DELETE_COMPONENT } from "../constant/schema";
import { mapMutations } from "../store/index";
export default {
  name: "components",
  mixins: [schemaMixin],
  components: {},
  created() {
    this.headConfig = headConfig;
  },
  data() {
    return {
      isShowMore: false,
    };
  },
  methods: {
    ...mapMutations(["updateSchema"]),
    addCmp(config) {
      if (config.label === "投票" || config.label === "表单") {
        this.$event.emit(
          "selectPlugin",
          config.label === "投票" ? 1 : 2,
          config
        );
      } else if (config.editConfig.after) {
        // console.log(DELETE_COMPONENT);
        // this.$$addNewComponent(config.editConfig.defaultSchema);
        // return;
        let me = this;
        me.$$addNewComponent(config.editConfig.defaultSchema);
        this.$event.emit("openEditWin", {
          title: config.editConfig.after.title,
          tab: config.editConfig.after.tab,
          cb(isSuccess) {
            if (!isSuccess) {
              me.updateSchema({
                type: DELETE_COMPONENT,
              });
            }
          },
        });
      } else if (config.editConfig.before) {
        this.$event.emit("openUploadWin", {
          onSelect: (a) => {
            if (a&&a.length) {
              this.$$addNewComponent(
                config.editConfig.before.fmtRes(
                  a,
                  config.editConfig.defaultSchema
                )
              );
            }
          },
          aSelectType: config.editConfig.before.types,
          multi: config.editConfig.before.multi,
          title: config.editConfig.before.title,
        });
      } else {
        this.$$addNewComponent(config.editConfig.defaultSchema);
      }
    },
    tmpSvg(msg) {
      return get(SVGS)[msg.type]({
        layoutConfig: {
          width: 30,
          height: 30,
        },
        props: {
          color: msg.color,
          type: msg.type,
        },
      });
    },
    /**
     * @param {status} 状态码 1:形状 2:线和箭头 3:装饰 4: 图片容器
     */
    moreSvg(status) {
      this.$event.emit("openMoreSvg", { id: status });
    },
  },
};
</script>

<style lang="less" scoped>
.flex-container {
  width: 100%;
  height: 100%;
  > ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > li {
      height: 100%;
      flex: 1;
      > div {
        position: relative;
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          padding-right: 6px;
        }
        .frame {
          display: none;
          position: absolute;
          top: 55px;
          z-index: 3;
          .arrow {
            border: 10px solid;
            border-color: transparent transparent #ffffff transparent;
            position: absolute;
            top: -9px;
            transform: translateX(-50%);
            left: 50%;
            z-index: 1;
          }
          .frame_content_h {
            z-index: 0;
            width: auto;
            height: auto;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            text-align: center;
            display: flex;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            background: #ffffff;
            box-shadow: 0px 5px 10px 0px rgba(178, 178, 178, 0.5);
            .list {
              width: auto;
              padding: 0 10px 0 39px;
              .frame_title {
                width: 100px;
                color: #000;
                box-sizing: border-box;
                padding: 19px 0 17px 0;
                text-align: left;
              }
              .frame_list {
                color: #666;
                display: flex;
                flex-direction: column;
                > li {
                  padding: 7px 0;
                  font-size: 14px;
                  text-align: left;
                  white-space: nowrap;
                  > i {
                    display: inline-block;
                    width: 30px;
                    vertical-align: middle;
                    text-align: center;
                  }
                  > span {
                    font-weight: bold;
                  }
                }
                > li:hover {
                  background: #ccc;
                }
              }
            }
          }
          .frame_content_l {
            z-index: 0;
            width: auto;
            height: auto;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            text-align: center;
            // display: flex;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            background: #ffffff;
            box-shadow: 0px 5px 10px 0px rgba(178, 178, 178, 0.5);
            .list {
              display: flex;
              height: 55px;
              line-height: 55px;
              width: auto;
              .frame_title {
                width: 85px;
                text-align: center;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                background: #f1f1f1;
                border-bottom: 1px solid #fff;
              }
              .frame_list {
                color: #666;
                display: flex;
                > li {
                  padding: 5px 20px 10px 10px;
                  white-space: nowrap;
                  width: auto;
                  height: auto;
                  > i {
                    display: inline-block;
                    width: 30px;
                    vertical-align: middle;
                    text-align: center;
                  }
                  > span {
                    font-weight: bold;
                  }
                  > div {
                    width: auto;
                    height: auto;
                  }
                }
                > li:hover {
                  background: #ccc;
                }
              }
              .more_btn {
                width: 50px;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                color: #75838f;
                // cursor: pointer;
                b {
                  border-bottom: 1px solid #d8d8d8;
                  box-sizing: border-box;
                  padding-bottom: 2px;
                  font-weight: 500;
                }
              }
            }
            .list:last-child .frame_title {
              border: none;
            }
          }
        }
      }
    }
    > li:hover {
      background: #999;
      cursor: pointer;
      .frame {
        display: inline-block;
      }
    }
    .show {
      display: inline-block;
    }
    .hide {
      display: none;
    }
  }
}
</style>
