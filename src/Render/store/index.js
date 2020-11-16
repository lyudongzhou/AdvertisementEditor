import Vuex from 'vuex';
import Vue from "vue";
import currentRenderState from "../../Stores/Render/currentRenderState";
import eventState from "../../Stores/Render/eventState";
//创建VueX对象
Vue.use(Vuex);

export const renderModules = {
  currentRenderState: currentRenderState,
  eventState: eventState,
};

const store = new Vuex.Store({modules: renderModules});
window.store = store;
export default store