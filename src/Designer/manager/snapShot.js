/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 06:10:15
 * @LastEditTime: 2020-11-30 07:56:50
 * @Description: page snap shot manager
 */

let snapShotInstance = null;
import EventEmitter from "EventEmitter";
class ScreenSnapshotManager extends EventEmitter {
  constructor() {
    super();
    this.aTask = [];
    this.oResult = {};
    this.isRender = false;
    this.start();
  }
  start() {
    this.stop();
    this.interval = setInterval(this.exe.bind(this), 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  exe() {
    if (!this.isRender && snapShotInstance) {
      let id = this.aTask.shift();
      if (id !== undefined) {
        this.isRender = true;
        snapShotInstance.render(id).then((data) => {
          this.isRender = false;
          this.oResult[id] = data;
          this.emit("change", {
            id: id,
            data: data,
          });
          window.console.log(data);
        });
      }
    }
  }
  getResult(id) {
    this.addEmptyResult(id);
    return this.oResult[id];
  }
  addEmptyResult(id) {
    if (!this.oResult[id]) {
      this.oResult[id] = "";
    }
  }
  addTask(id, useCache = true,isOrder = true) {
    if (!useCache) {
      if (this.aTask.indexOf(id) === -1) {
        if(isOrder){
          this.aTask.push(id);
        }else{
          this.addImmediately(id);
        }
      }
      this.addEmptyResult(id);
      this.emit("change", {
        id: id,
        data: "",
      });
    } else {
      let cache = this.getResult(id);
      if (cache === "") {
        if(isOrder){
          this.addImmediately(id);
        }else{
          this.addTask(id,false,true);
        }
      }
    }
  }
  addImmediately(id) {
    let index = this.aTask.indexOf(id);
    if (index !== -1) {
      this.aTask.splice(index, 1);
    }
    this.aTask.unshift(id);
    this.addEmptyResult(id);
    this.emit("change", {
      id: id,
      data: "",
    });
  }
}
export default new ScreenSnapshotManager();
export function setSnapShotInstance(instance) {
  snapShotInstance = instance;
}
