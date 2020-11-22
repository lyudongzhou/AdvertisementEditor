<template>
  <div class="flex-container content-center">
    <ul>
      <li v-for="config in headConfig" :key="config.label">
        <i><img :src="config.icon" alt="" /></i>
        <span>{{config.label}}</span>
        <div class="frame" v-if="config.children.length>0">
          <div class="arrow"></div>
          <div class="frame_content">
            <div class="list" v-for="msg in config.children" :key="msg.id">
              <p class="frame_title">{{msg.label}}</p>
              <ol class="frame_list">
                <li v-for="child in msg.children" :key="child.id">
                  <i class="el-icon-s-platform"></i>
                  <!-- <i><img :src="child.icon" /></i> -->
                  <span>{{child.label}}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import headConfig from '../config/headConfig.json';

  export default {
    name: 'components',
    components: {
    },
    created() {
      this.headConfig = headConfig;
    },
    data() {
      return {
      };
    }
  }
</script>

<style lang="less" scoped>
  .flex-container {
    width: 100%;
    height: 55px;
    >ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      >li {
        position: relative;
        height: 100%;
        flex: 1;
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
            top: 10px;
            transform: translateX(-50%);
            left: 50%;
            background: #ffffff;
            text-align: center;
            border: 1px solid #666;
            box-sizing: border-box;
            .list:not(:last-child) {
              .frame_title {
                border-bottom: 1px solid #999;
              }
            }
            .list {
              width: auto;
              height: 50px;
              line-height: 50px;
              display: flex;
              .frame_title {
                width: 100px;
                height: 100%;
                color: #000;
                background: #ccc;
                box-sizing: border-box;
              }
              .frame_list {
                color: #666;
                display: flex;
                >li {
                  width: 120px;
                  font-size: 14px;
                  text-align: left;
                  >i {
                    padding: 0 10px 0 10px;
                  }
                  >span {
                    font-weight: bold;
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
    }
  }
</style>
