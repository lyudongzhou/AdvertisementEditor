/*
 * @Author: LyuDongzhou
 * @Date: 2020-12-09 00:32:19
 * @LastEditTime: 2020-12-09 02:42:37
 * @Description: file content
 */
import { mapMutations } from "../store";
import store from "../store";
import Vue from 'vue';
import {AUTO_BEFORE_PROP,AUTO_UPDATING_PROP,AUTO_AFTER_PROP} from "../constant/schema";
console.log(mapMutations);
// const updateSchema = mapMutations(["updateSchema"]).updateSchema;
class Throttle {
    constructor() {
        this.unCommit = { path: null, value: null };//未提交的数据
        Vue.observable(this.unCommit);
    }
    canUndo() {
        return this.unCommit.path!==null;
    }
    /**
     * @description: 更新配置，如果路径不一致则提交
     * @param {*} path
     * @param {*} value
     * @return {*}
     */
    update(path, value,flushNow = false) {
        if (this.unCommit.path !== path) {
            this.flush();
            this.begin(path, value);
        }
        this.storage(path, value);
        if(flushNow){
            this.flush();
        }
    }
    /**
     * @description: 开始新的纪录，如果有上次有记录则提交
     * @param {*} value
     * @return {*}
     */
    flush() {
        this.commit(AUTO_AFTER_PROP, this.unCommit.path,this.unCommit.value);
        this.unCommit.path = null;
        this.unCommit.value = null;
    }
    begin(path, value) {
        this.commit(AUTO_BEFORE_PROP,path, value);
        this.unCommit.path = path;
        this.unCommit.value = value;
    }
    storage(path, value) {
        this.commit(AUTO_UPDATING_PROP,path, value);
        this.unCommit.value = value;
    }
    commit(type,path,value) {
        if (path !== null) {
            
            mapMutations(["updateSchema"]).updateSchema.call({ $store: store }, {
                type: type,
                value: {[path]:value},
            });
        }
    }
}
export default new Throttle();