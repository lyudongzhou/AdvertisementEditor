<template>
  <el-container style="height: 100%; background-color: #4d4d4d">
    <el-aside width="70px">
      <!-- 素材、节目 -->
      <div v-for="list in typeList" :key="list.id"
           :class="{typeSwitch: true, active: typeSwitch === list.id }"
           @click="typeSwitch=list.id">
        {{list.name}}
      </div>
    </el-aside>
    <!-- <el-container style="width: 200px" v-if="typeSwitch === 1"> -->
    <el-container style="width: 200px">
      <el-header style="padding: 0px; height: 150px">
        <el-container>
          <!-- 机构、商城 -->
          <el-header style="height: 40px; padding: 0px; display: flex">
            <div v-for="list in switchList" :key="list.id"
                 :class="{ switch_list: true, active: sortConfig.type === list.id }"
                 @click="onSortConfigChange(3, list.id)">
              {{list.name}}
            </div>
          </el-header>
          <el-main style="padding: 0">
            <!-- search input -->
            <el-input
              placeholder="搜索素材"
              v-model="searchText"
              @blur="onSortConfigChange(4, searchText)"
              style="margin: 24px 16px 24px 10px; width: 174px"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <!-- 类型、排序、价格 -->
            <sortItem :typeSwitch="typeSwitch" @sort-click="onSortClick"></sortItem>
          </el-main>
        </el-container>
      </el-header>
      <el-main style="padding: 0">
        <!-- resource content -->
        <resources
         :sortConfig="sortConfig"
         :typeSwitch="typeSwitch"></resources>
      </el-main>
    </el-container>
    <sortPanel
      v-if="sortPanelShow"
      :select="fmtSelect()"
      :style="sortPosition"
      :sortType="sortType"
      @sort-config-change="onSortConfigChange"
      @mouse-leave="closeSortPanel"
    ></sortPanel>
  </el-container>
</template>
<script>
import resources from "./resources";
import sortItem from "./sortItem";
import sortPanel from "./sortPanel";

export default {
  data() {
    return {
      typeList: [
        {
          id: 1,
          name: "素材",
        },
        {
          id: 2,
          name: "节目",
        }
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
        }
      ],
      isCollapse: true,
      sortType: null,
      searchText: "",
      sortConfig: {
        searchText: "",
        type: 1, // 机构1商城2
        resType: 0,
        orderType: 0,
        priceType: 1,
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
    onSortClick(type) {
      if (type !== this.sortType) {
        this.sortPanelShow = true;
      } else {
        this.closeSortPanel();
        return;
      }
      this.sortType = type;
      this.$set(
        this.sortPosition,
        "left",
        type === 0 ? "55px" : type === 1 ? "117px" : "186px"
      );
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
      this.sortConfig[this.caculateSortType(type)] = config;
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
.typeSwitch {
  width: 70px;
  background-color: #424242;
  text-align: center;
  line-height: 70px;
  color: #b5b5b5;
  cursor: default;
  border: 1px solid #383838;
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
.switch_list {
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
