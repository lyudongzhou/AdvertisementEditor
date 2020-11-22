import Vue from 'vue'
import App from './App.vue'
import "../Utils/css/reset.css";
import './assets/css/animations.css';
import store from "./store";
import axios from 'axios';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$BASE_URL = BASE_URL;
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
