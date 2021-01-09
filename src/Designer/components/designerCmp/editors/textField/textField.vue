<template>
    <el-input
        v-model="text"
        placeholder="请输入内容"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
    ></el-input>
</template>

<script>
import { getPropByPath } from "@/utils";
import { mapMutations } from "../../../../store";
import {
  UPDATING_COMPONENT_PROPS,
  BEFORE_UPDATE_COMPONENT_PROPS,
  AFTER_UPDATE_COMPONENT_PROPS,
} from "../../../../constant/schema";

export default {
    name: "textField",
    props: ["configData", "config"],
    data() {
      return {
        text: '',
      };
    },
    computed: {
      dataText() {
        return getPropByPath(this.configData, this.config.target);
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.isMounted = true;
      });
      this.text = getPropByPath(this.configData, this.config.target);
    },
    methods: {
      ...mapMutations(["updateSchema"]),
      changeFun(type) {
        this.updateSchema({
          type: type,
          value: {
            [this.config.target]: this.text,
          },
        });
      },
      onChange() {
        this.changeFun(UPDATING_COMPONENT_PROPS);
      },
      onFocus() {
        this.changeFun(BEFORE_UPDATE_COMPONENT_PROPS);
        this.beforeValue = this.dataText;
      },
      onBlur() {
        if (this.beforeValue !== this.dataText) {
          this.changeFun(AFTER_UPDATE_COMPONENT_PROPS);
        }
      },
    },
    watch: {
      dataText (text) {
        this.text = text;
      },
    },
};
</script>

<style></style>
