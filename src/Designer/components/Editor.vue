<template>
  <el-container style="height: 100%; background-color: #4d4d4d">
    <el-aside width="70px">
      <!-- 素材、节目 -->
      <div
        v-for="list in typeList"
        :key="list.id"
        :class="{ typeSwitch: true, active: typeSwitch === list.id }"
        @click="typeSwitch = list.id"
      >
        <img :src="list.icon" class="typeSwitchIcon" />
        <div>{{ list.name }}</div>
      </div>
    </el-aside>
    <!-- <el-container style="width: 200px" v-if="typeSwitch === 1"> -->
    <el-container style="width: 200px">
      <el-header style="padding: 0px; height: 150px">
        <el-container>
          <!-- 机构、商城 -->
          <el-header style="height: 40px; padding: 0px; display: flex">
            <div
              v-for="list in switchList"
              :key="list.id"
              :class="{
                switch_list: true,
                active: sortConfig.type === list.id,
              }"
              @click="onSortConfigChange('type', list.id)"
            >
              {{ list.name }}
            </div>
          </el-header>
          <el-main style="padding: 0">
            <!-- search input -->
            <el-input
              :placeholder="typeSwitch === 1 ? '搜索素材' : '搜索节目'"
              v-model="searchText"
              @blur="onSortConfigChange(4, searchText)"
              style="margin: 24px 16px 24px 10px; width: 174px; color: white"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <!-- 类型、排序、价格 -->
            <sortItem
              :sortTabConfig="sortTabConfig[typeSwitch][sortConfig.type]"
              @sort-click="onSortClick"
            ></sortItem>
          </el-main>
        </el-container>
      </el-header>
      <el-main style="padding: 0">
        <!-- resource content -->
        <resources
          :sortConfig="sortConfig"
          :typeSwitch="typeSwitch"
        ></resources>
      </el-main>
    </el-container>
    <sortPanel
      v-if="sortPanelShow"
      :select="fmtSelect()"
      :style="sortPosition"
      :sortType="sortPanelConfig"
      :property="panelProperty"
      @sort-config-change="onSortConfigChange"
      @mouse-leave="closeSortPanel"
      :type="typeSwitch"
      :targetType="sortConfig.type"
    ></sortPanel>
  </el-container>
</template>
<script>
import resources from "./resources";
import sortItem from "./sortItem";
import sortPanel from "./sortPanel";
import resourceIcon from "../public/resource.png";
import programIcon from "../public/program.png";
export default {
  data() {
    return {
      sortPanelConfig: [],
      panelProperty: "",
      sortTabConfig: {
        1: {
          1: [
            {
              text: "类型",
              type: 0,
              aSort: [
                {
                  label: "全部",
                  value: 5,
                },
                {
                  label: "图片",
                  value: 1,
                },
                {
                  label: "视频",
                  value: 2,
                },
                {
                  label: "文档",
                  value: 4,
                },
              ],
            },
            {
              text: "排序",
              type: 1,
              aSort: [
                {
                  label: "默认",
                  value: 0,
                },
                {
                  label: "最新",
                  value: 1,
                },
                {
                  label: "精选",
                  value: 2,
                },
              ],
            },
            { text: "全部", type: 5, isLabel: true },
          ],
          2: [
            {
              text: "类型",
              type: 0,
              aSort: [
                {
                  label: "全部",
                  value: 5,
                },
                {
                  label: "图片",
                  value: 1,
                },
                {
                  label: "视频",
                  value: 2,
                },
                {
                  label: "文档",
                  value: 4,
                },
              ],
            },
            {
              text: "排序",
              type: 1,
              aSort: [
                {
                  label: "默认",
                  value: 0,
                },
                {
                  label: "最新",
                  value: 1,
                },
                {
                  label: "精选",
                  value: 2,
                },
              ],
            },
            {
              text: "价格",
              type: 2,
              aSort: [
                {
                  label: "免费",
                  value: 1,
                },
                {
                  label: "会员免费",
                  value: 2,
                },
              ],
            },
            { text: "全部", type: 5, isLabel: true },
          ],
        },
        2: {
          1: [
            {
              text: "排序",
              type: 1,
              aSort: [
                {
                  label: "默认",
                  value: 0,
                },
                {
                  label: "最新",
                  value: 1,
                },
                {
                  label: "精选",
                  value: 2,
                },
              ],
            },
            { text: "全部", type: 5, isLabel: true },
          ],
          2: [
            {
              text: "排序",
              type: 1,
              aSort: [
                {
                  label: "默认",
                  value: 0,
                },
                {
                  label: "最新",
                  value: 1,
                },
                {
                  label: "精选",
                  value: 2,
                },
              ],
            },
            {
              text: "价格",
              type: 2,
              aSort: [
                {
                  label: "免费",
                  value: 1,
                },
                {
                  label: "会员免费",
                  value: 2,
                },
              ],
            },
            { text: "全部", type: 5, isLabel: true },
          ],
        },
      },
      typeList: [
        {
          id: 1,
          name: "图文",
          icon: resourceIcon,
        },
        {
          id: 2,
          name: "节目",
          icon: programIcon,
        },
      ],
      typeSwitch: 1,
      switchList: [
        {
          id: 1,
          name: "机构",
        },
        {
          id: 2,
          name: "商城",
        },
        {
          id: 9,
          name: "个人",
        },
      ],
      isCollapse: true,
      sortType: null,
      searchText: "",
      sortConfig: {
        searchText: "",
        type: 1, // 机构1商城2
        resType: 5,
        orderType: 0,
        priceType: 1,
        labelIds: [],
      },
      sortPosition: {
        top: "208px",
        zIndex: 5,
        left: "55px",
      },
      sortPanelShow: false,
    };
  },
  components: {
    resources,
    sortItem,
    sortPanel,
  },
  methods: {
    caculateSortType(index) {
      let type = "resType";
      switch (index) {
        case 0:
          type = "resType";
          break;
        case 1:
          type = "orderType";
          break;
        case 2:
          type = "priceType";
          break;
        case 3:
          type = "type";
          break;
        case 4:
          type = "searchText";
          break;
        case 5:
          type = "labelIds";
      }
      return type;
    },
    fmtSelect() {
      let type = this.caculateSortType(this.sortType);
      return this.sortConfig[type];
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 类型排序价格菜单栏是否需要折叠起来
    onSortClick(item, index, total) {
      if (item.type !== this.sortType) {
        this.sortPanelShow = true;
      } else {
        this.closeSortPanel();
        return;
      }
      this.sortType = item.type;
      this.panelProperty = this.caculateSortType(item.type);
      if (total === 4) {
        this.$set(
          this.sortPosition,
          "left",
          index === 0
            ? "40px"
            : index === 1
            ? "90px"
            : index === 2
            ? "140px"
            : "180px"
        );
      } else {
        this.$set(
          this.sortPosition,
          "left",
          index === 0 ? "55px" : index === 1 ? "117px" : "186px"
        );
      }
      while (this.sortPanelConfig.length) {
        this.sortPanelConfig.pop();
      }
      item.aSort &&
        item.aSort.forEach((ele) => {
          this.sortPanelConfig.push(ele);
        });
      // this.sortPosition = this.fmtSortStyle(type);
    },
    fmtSortStyle(type) {
      let left = 0;
      switch (type) {
        case 1:
          left = "100px";
          break;
        case 2:
          left = "200px";
      }
      return {
        zIndex: 1,
        left: left,
      };
    },
    onSortConfigChange(type, config) {
      if (type === "labelIds") {
        this.sortConfig[type] = [config];
      } else {
        this.sortConfig[type] = config;
      }
      console.log(this.sortConfig);
      this.sortConfig = Object.assign({}, this.sortConfig);
      this.closeSortPanel();
    },
    closeSortPanel() {
      this.sortPanelShow = false;
      this.sortType = null;
    },
  },
};
</script>

<style scoped>
.typeSwitchIcon {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
.typeSwitch {
  width: 70px;
  height: 70px;
  background-color: #424242;
  text-align: center;
  /* line-height: 70px; */
  color: #b5b5b5;
  cursor: default;
  border: 1px solid #383838;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.typeSwitch.active {
  background-color: #535353;
  color: white;
  cursor: pointer;
}
.typeSwitch:hover {
  background-color: #535353;
  color: white;
  cursor: pointer;
}
/* .typeSwitchItem{

} */
.switch_list {
  font-size: 16px;
  width: 100px;
  background-color: #424242;
  text-align: center;
  line-height: 40px;
  color: #b5b5b5;
  cursor: default;
  border: 1px solid #383838;
}
.switch_list:hover {
  background-color: #535353;
  color: white;
  cursor: pointer;
}
.switch_list.active {
  background-color: #535353;
  color: white;
  cursor: pointer;
  border-bottom: 0;
}
</style>
