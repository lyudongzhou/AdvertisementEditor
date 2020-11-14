import Vuex from 'vuex';
import Vue from "vue";
import currentRenderState from "../../Stores/Render/currentRenderState";
import eventState from "../../Stores/Render/eventState";
//创建VueX对象
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        currentRenderState:currentRenderState,
        eventState:eventState
    }
});
window.store = store;
export default store