<template>
  <vue-draggable-resizable
    class="editWin fly"
    :resizable="false"
    :parent="false"
    :y="initialPosition.y"
    :x="initialPosition.x"
    :h="'auto'"
    :w="327"
    v-if="!isClose"
    dragHandle=".editor_header"
  >
    <el-container style="height:100%;padding:10px">
      <el-header class="editor_header">
        <span>编辑面板</span>
        <i class="el-icon-close" @click="closeSetDialog"></i>
      </el-header>
      <el-main class="noPadding">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item
            v-for="(tab, index) in tabs"
            :key="index"
            :title="tab.name"
            :name="index"
            class="collapse-item"
          >
            <component
              :is="tab.type"
              :configData="currentComponent"
              :config="tab"
              class="tabInner"
            ></component>
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </vue-draggable-resizable>
</template>

<script>
// import { mapState } from "../store";
import { get } from "@/register";
import { REG_TABS, REG_COMPONENTSSCHEMA, DEFAULTTABS } from "@/const";
import "./designerCmp";
import VueDraggableResizable from "vue-draggable-resizable";
import { mapGetters } from "../store";
export default {
  name: "editorWin",
  components: { ...get(REG_TABS), VueDraggableResizable },
  props: ["parentWidth"],
  data() {
    return {
      activeNames: 0,
      isClose: true,
      tabs: [],
    };
  },
  computed: {
    // ...mapState(['schema', 'projectInfo']),
    ...mapGetters(["currentComponent"]),
    initialPosition() {
      return { x: this.parentWidth - 327-298-50,y:55 };
    },
  },
  created() {},
  mounted() {
    window.edit = this;
    this.onChangeType(this.currentComponent);
  },
  methods: {
    closeSetDialog() {
      this.isClose = true;
    },
    onChangeType(data) {
      if (!data) {
        return;
      }
      const schema = get(REG_COMPONENTSSCHEMA)[data.type];
      if (!schema) {
        return;
      }
      const notSupport = {};
      while (this.tabs.length) {
        this.tabs.pop();
      }
      schema.notSupport &&
        schema.notSupport.forEach((ele) => {
          notSupport[ele.type] = true;
        });
      DEFAULTTABS.forEach((ele) => {
        if (!notSupport[ele.type]) {
          this.tabs.push(ele);
        }
      });
      schema.extraTabs &&
        schema.extraTabs.forEach((ele) => {
          this.tabs.push(ele);
        });
        schema.extraTabs && (this.activeNames = DEFAULTTABS.length);
    },
  },
  watch: {
    currentComponent(data) {
      // 判断是否为二维码
      if(data && data.name.indexOf('二维码') != -1){
        if(data.props.text == 'qrcode'){
          data.props.text = window.previewUrl||window.location.href;
        }
        // console.log(this.projectInfo);
        // console.log(this.schema);
      }
      this.activeNames = '';
      this.isClose = data ? false : true;
      this.onChangeType(data);
    },
    // activeNames (n) {
    //   if (n === 4) { // 4:私有配置的name
    //     this.$event.emit('SHOWCOLORPICKER')
    //   }
    // }
  },
};
</script>

<style lang="less" scoped>
.fly {
  background-color: #555555;
  border: 5px solid #666666;
  border-radius: 10px;
  /*transition: transform 0.3s ease-out;*/
  color: snow;
  width: 300px;
  height: 70%;
  overflow: hidden;
  .editor_header {
    position: relative;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    i {
      position: absolute;
      right: 0;
      line-height: 30px;
      cursor: pointer;
    }
  }
  .noPadding {
    overflow: hidden;
    padding: 0;
    height: cals(100%);
    overflow-y: auto;
    .collapse-item {
      background: #535353;
      border: 1px 1px 0 0 solid #373737;

      .tabInner {
        width:100%;
        background: #4d4d4d;
      }
    }
  }
  &.editWin {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    &.vdr {
      border: none;
    }
  }
}
</style>
