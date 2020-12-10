<!--
 * @Author: LyuDongzhou
 * @Date: 2020-12-07 01:13:50
 * @LastEditTime: 2020-12-09 03:07:37
 * @Description: file content
-->
<template>
    <el-input-number
        v-model="text"
        placeholder="请输入内容"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        :controls="false"
        :min="config.props.min"
        :max="config.props.max"
    ></el-input-number>
</template>

<script>
import { getPropByPath } from "@/utils";
import { mapMutations, mapState } from "../../../../store";
// import Throttle from "../../../../manager/updateThrottle";
import {
    UPDATING_COMPONENT_PROPS,
    BEFORE_UPDATE_COMPONENT_PROPS,
    AFTER_UPDATE_COMPONENT_PROPS,
} from "../../../../constant/schema";
export default {
    name: "numberField",
    props: ["configData", "config"],
    created() {},
    data() {
        return {
            text: 0,
            isNew: false,
        };
    },
    computed: {
        ...mapState(["currentComponentId"]),
        dataText() {
            return getPropByPath(this.configData, this.config.target);
        },
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
        // onBlur() {
        //   console.log("blur");
        //   this.changeFun(AFTER_UPDATE_COMPONENT_PROPS);
        // },
        onChange() {
            console.log("change");
            // Throttle.update(this.config.target, this.text);
            //   console.log("change");
            //   UPDATE_COMPONENT_PROPS;
            //   this.updateSchema({
            //     type: window.isCommit ? "myCommit" : "myUpdate",
            //     value: {
            //       [this.config.target]: this.text,
            //     },
            //   });

            this.changeFun(UPDATING_COMPONENT_PROPS);
        },
        onFocus() {
            console.log("focus");
            this.changeFun(BEFORE_UPDATE_COMPONENT_PROPS);
            this.beforeValue = this.dataText;
        },
        onBlur() {
            console.log("blur");

            if (this.beforeValue !== this.dataText) {
                this.changeFun(AFTER_UPDATE_COMPONENT_PROPS);
            }
        },
        // onInput() {
        //   if (this.isMounted && !this.isNew) {
        //     this.isNew = false;
        //     console.log("input");
        //     this.changeFun(AFTER_UPDATE_COMPONENT_PROPS);
        //   }
        // },
    },
    watch: {
        currentComponentId() {
            console.log("currentComponentId");
            this.isNew = true;
        },
        dataText(text) {
            this.text = parseFloat(text);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.isMounted = true;
        });
        this.text = getPropByPath(this.configData, this.config.target);
        console.log("mounted");
    },
};
</script>

<style></style>
