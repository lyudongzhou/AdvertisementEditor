<template>
  <div :class="rootClass">
    <ul
      :class="`${rootClass}__wrapper`"
      v-infinite-scroll="load"
      infinite-scroll-immediate="false"
      infinite-scroll-distance="100"
      infinite-scroll-disabled="isDisabled"
    >
      <li
        v-for="(dataImage, index) in dataImagesLocal"
        :key="index"
        :class="`${rootClass}__item`"
      >
        <div
          :class="
            classThumbnail(singleSelected.id, dataImage.id, dataImage.disabled)
          "
          :style="`width:${w};position:relative`"
          @click="onSelectImage(dataImage)"
          v-if="!isMultiple"
        >
          <img
            v-if="dataImage.payload.isVip"
            :src="imageIcon"
            style="position: absolute; width: 70px; height: 30px"
          />
          <img
            :src="dataImage.payload.approveState === 1 ? reviewed : reviewing"
            style="
              position: absolute;
              width: 38px;
              height: 38px;
              right: 0px;
              top: 0px;
            "
          />
          <img
            :src="dataImage.src"
            :alt="dataImage.alt"
            :id="dataImage.id"
            :width="w"
            :height="h"
            :class="`${rootClass}__img`"
          />

          <label
            :for="dataImage.id"
            v-if="useLabel"
            :class="`${rootClass}__lbl`"
            >{{ dataImage.alt }}</label
          >
        </div>

        <div
          :class="classThumbnailMultiple(dataImage.id, dataImage.disabled)"
          @click="onSelectMultipleImage(dataImage)"
          :style="`width:${w};position:relative`"
          v-if="isMultiple"
        >
          <img
            v-if="dataImage.payload.isVip"
            :src="imageIcon"
            style="position: absolute; width: 70px; height: 30px"
          />
          <img
            :src="dataImage.payload.approveState === 1 ? reviewed : reviewing"
            style="
              position: absolute;
              width: 38px;
              height: 38px;
              right: 0px;
              top: 0px;
            "
          />
          <img
            :src="dataImage.src"
            :alt="dataImage.alt"
            :id="dataImage.id"
            :width="w"
            :height="h"
            :class="`${rootClass}__img`"
          />

          <label
            :for="dataImage.id"
            v-if="useLabel"
            :class="`${rootClass}__lbl`"
            >{{ dataImage.alt }}</label
          >
        </div>
      </li>
      <div style="float: left; width: 100%; text-align: center">
        <p v-if="isLoading" style="margin-left: 10px">加载中...</p>
        <p v-if="noMore" style="margin-left: 10px">没有更多了</p>
      </div>
    </ul>
  </div>
</template>

<script>
var console = { log: () => {} };
import imageIcon from "../../public/58.png";
import reviewing from "../../public/reviewing.png";
import reviewed from "../../public/reviewed.png";
export default {
  name: "vue-select-image",
  props: {
    dataImages: {
      type: Array,
      default: () => [],
    },
    selectedImages: {
      type: Array,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    useLabel: {
      type: Boolean,
      default: false,
    },
    rootClass: {
      type: String,
      default: "vue-select-image",
    },
    activeClass: {
      type: String,
      default: "--selected",
    },
    h: {
      type: String,
      default: "auto",
    },
    w: {
      type: String,
      default: "auto",
    },
    limit: {
      type: Number,
      default: 0,
    },
    load: {
      type: Function,
      default: function () {
        console.log("errLoad");
      },
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isLoading(data) {
      console.log(1111, data);
    },
    noMore(data) {
      console.log("nomore", data);
    },
  },
  data() {
    return {
      singleSelected: {
        id: "",
      },
      multipleSelected: [],
    };
  },
  computed: {
    dataImagesLocal: function () {
      return this.dataImages || [];
    },
  },
  created() {
    this.imageIcon = imageIcon;
    this.reviewing = reviewing;
    this.reviewed = reviewed;
    console.log("created");
  },
  mounted() {
    // set initial selectedImage
    this.setInitialSelection();
  },
  methods: {
    reset() {
      this.singleSelected.id = "";
      this.multipleSelected.splice(0, this.multipleSelected.length);
    },
    removeSelect(id) {
      let arrSelect = [];
      this.multipleSelected.forEach((ele) => {
        if (ele.id === id) {
          arrSelect.push(ele);
        }
      });
      arrSelect.forEach((ele) => {
        this.multipleSelected.splice(this.multipleSelected.indexOf(ele), 1);
      });
    },
    classThumbnail(selectedId, imageId, isDisabled) {
      const baseClass = `${this.rootClass}__thumbnail`;
      if (isDisabled) {
        return `${baseClass} ${baseClass}--disabled`;
      }
      if (selectedId === imageId) {
        return `${baseClass} ${baseClass}${this.activeClass}`;
      }
      return `${baseClass}`;
    },
    classThumbnailMultiple(id, isDisabled) {
      const baseClass = `${this.rootClass}__thumbnail`;
      const baseMultipleClass = `${baseClass} is--multiple`;
      if (isDisabled) {
        return `${baseMultipleClass} ${baseClass}--disabled`;
      }
      if (this.isExistInArray(id)) {
        return `${baseMultipleClass} ${baseClass}${this.activeClass}`;
      }
      return `${baseMultipleClass}`;
    },
    onSelectImage(objectImage) {
      var isVip;
      try {
        isVip =
          JSON.parse(window.localStorage.getItem("saber-userInfo")).content
            .memberType === 1;
      } catch (e) {
        console.log("vipCatchErr");
        isVip = true;
      }
      if (!isVip && objectImage.payload && objectImage.payload.isVip) {
        return;
      }
      if (objectImage.payload && objectImage.payload.approveState !== 1) {
        return;
      }
      if (!objectImage.disabled) {
        this.singleSelected = Object.assign(
          {},
          this.singleSelected,
          objectImage
        );
        this.$emit("onselectimage", objectImage);
      }
    },
    isExistInArray(id) {
      return this.multipleSelected.find((item) => {
        return id === item.id;
      });
    },
    removeFromSingleSelected() {
      this.singleSelected = {};
      this.$emit("onselectimage", {});
    },
    removeFromMultipleSelected(id, dontFireEmit) {
      this.multipleSelected = this.multipleSelected.filter((item) => {
        return id !== item.id;
      });
      if (!dontFireEmit) {
        this.$emit("onselectmultipleimage", this.multipleSelected);
      }
    },
    resetMultipleSelection() {
      this.multipleSelected = [];
    },
    onSelectMultipleImage(objectImage, isSkip) {
      var isVip;
      try {
        isVip =
          JSON.parse(window.localStorage.getItem("saber-userInfo")).content
            .memberType === 1;
      } catch (e) {
        console.log("vipCatchErr");
        isVip = true;
      }
      if (!isSkip) {
        if (!isVip && objectImage.payload && objectImage.payload.isVip) {
          return;
        }
        if (objectImage.payload && objectImage.payload.approveState !== 1) {
          return;
        }
      }
      if (!objectImage.disabled) {
        if (!this.isExistInArray(objectImage.id)) {
          if (this.limit > 0) {
            if (this.multipleSelected.length < this.limit) {
              this.multipleSelected.push(objectImage);
              this.$emit("onselectmultipleimage", this.multipleSelected);
            } else {
              this.$emit("onreachlimit", this.limit);
            }
          } else {
            this.multipleSelected.push(objectImage);
            this.$emit("onselectmultipleimage", this.multipleSelected);
          }
        } else {
          this.$emit("onselectmultipleimagedelete", objectImage);
          this.removeFromMultipleSelected(objectImage.id, true);
          this.$emit("onselectmultipleimage", this.multipleSelected);
        }
      }
    },
    setInitialSelection() {
      if (this.selectedImages) {
        if (!this.isMultiple && this.selectedImages.length === 1) {
          this.singleSelected = Object.assign({}, this.selectedImages[0]);
        } else {
          this.multipleSelected = [].concat(this.selectedImages);
        }
      }
    },
  },
};
</script>

<style scoped>
.vue-select-image {
  width: 100%;
  height: 100%;
}
.vue-select-image__wrapper {
  overflow: auto;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}

.vue-select-image__item {
  margin: 0px 12px 12px 0px;
  float: left;
}

.vue-select-image__thumbnail {
  cursor: pointer;
  padding: 6px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;

  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;

  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);

  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.vue-select-image__thumbnail--selected {
  background: #0088cc;
}

.vue-select-image__thumbnail--disabled {
  background: #b9b9b9;
  cursor: not-allowed;
}

.vue-select-image__thumbnail--disabled > .vue-select-image__img {
  opacity: 0.5;
}

.vue-select-image__img {
  -webkit-user-drag: none;
  display: block;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.vue-select-image__lbl {
  line-height: 3;
  width: 100%;
  height: 100%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

@media only screen and (min-width: 1200px) {
  .vue-select-image__item {
    margin-left: 10px;
  }
}
.nomore {
  text-align: center;
  padding-top: 10px;
  color: #999;
  margin-left: 10px;
}
</style>
