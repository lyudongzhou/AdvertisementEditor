<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-13 19:00:38
 * @LastEditTime: 2020-12-13 20:27:14
 * @Description: file content
-->
<template>
  <el-row :gutter="20">
    <el-col v-for="(o, index) in data" :key="index" :span="12">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container style="height: 100px">
          <img
            v-if="o.type === 'image'"
            :src="o.src"
            class="image"
            @click="handleClick(o)"
          />
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import schemaMixin from "../mixin/schemaMixin";
import { get } from "@/register";
import { REG_TITLECONFIG } from "@/const";
const config = get(REG_TITLECONFIG);
export default {
  props: [],
  mixins: [schemaMixin],
  data() {
    return {
      data: [
        {
          type: "image",
          src:
            "https://www.jingtop.com/UploadFiles/img_0_3577724246_2758062480_26.jpg",
        },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
        { type: "image", src: "images/Koala.jpg" },
      ],
    };
  },
  methods: {
    handleClick(o) {
      let defaultSchema = config["ImageCmp"][0].defaultSchema;
      defaultSchema.props.bgUrl = o.src;
      this.$$addNewComponent(defaultSchema);
    },
    getData(){
        return this.$http.get();
    }
  },
};
</script>

<style scope>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
