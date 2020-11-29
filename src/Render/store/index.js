import Vuex from 'vuex';
import Vue from "vue";
import currentRenderState from "../../Stores/Render/currentRenderState";
import eventState from "../../Stores/Render/eventState";
import {createNamespacedHelpers} from 'vuex';
//创建VueX对象
Vue.use(Vuex);

export const renderModules = {
  currentRenderState: currentRenderState,
  eventState: eventState,
};

export const {mapState,mapActions,mapMutations,mapGetters} = createNamespacedHelpers('currentRenderState');

const store = new Vuex.Store({modules: renderModules});
window.store = store;
export default store
