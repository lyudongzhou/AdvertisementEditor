import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../Utils/css/reset.css";
import './base/base.css';
import store from './store';
import handleRenderDep from './renderDep';

Vue.config.productionTip = false;

Vue.use(ElementUI);
handleRenderDep({Vue, store});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');