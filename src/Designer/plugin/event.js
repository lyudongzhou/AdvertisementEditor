import EventEmitter from "EventEmitter";

export const eventBus = new EventEmitter();

export default {
  install(Vue) {
    Vue.prototype.$event = eventBus;
  }
}