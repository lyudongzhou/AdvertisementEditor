<template>
  <div class="flex-container content-center">
    <ul>
      <li v-for="config in headConfig" :key="config.label">
        <div v-if="config.children.length>0" ref="moreCmp">
          <i><img :src="config.icon" alt="" /></i>
          <span>{{config.label}}</span>
          <div class="frame" ref="frame">
            <!-- <div class="arrow"></div> -->
            <div class="frame_content">
              <div class="list" v-for="msg in config.children" :key="msg.id">
                <p class="frame_title">{{msg.label}}</p>
                <ol class="frame_list">
                  <li v-for="child in msg.children" :key="child.id" @click="addCmp(child)">
                    <i><img :src="child.icon" /></i>
                    <span>{{child.label}}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div v-else @click="addCmp(config)">
          <i><img :src="config.icon" alt="" /></i>
          <span>{{config.label}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import headConfig from '../config/headerConfig';
  import schemaMixin from '../mixin/schemaMixin';

  export default {
    name: 'components',
    mixins: [schemaMixin],
    components: {
    },
    created() {
      this.headConfig = headConfig;
    },
    data() {
      return {
        isShowMore: false,
      };
    },
    methods: {
      addCmp (config) {
        console.log(config);
        this.$$addNewComponent(config.editConfig.defaultSchema);
      }
    }
  }
</script>

<style lang="less" scoped>
  .flex-container {
    width: 100%;
    height: 100%;
    >ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      >li {
        height: 100%;
        flex: 1;
        >div {
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
            .frame_content {
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
              background: #FFFFFF;
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
                  >li {
                    padding: 7px 0;
                    font-size: 14px;
                    text-align: left;
                    white-space: nowrap;
                    >i {
                      display: inline-block;
                      width: 30px;
                      vertical-align: middle;
                      text-align: center;
                    }
                    >span {
                      font-weight: bold;
                    }
                  }
                  >li:hover {
                    background: #ccc;
                  }
                }
              }
            }
          }
        }
      }
      >li:hover {
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
