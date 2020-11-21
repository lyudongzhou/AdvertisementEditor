import EventEmitter from "EventEmitter";
export default {
  install(Vue) {
    Vue.prototype.$event = new EventEmitter();
  }
}