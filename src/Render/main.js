import Vue from 'vue'
import App from './App.vue'
import "../Utils/css/reset.css";
import './assets/css/animations.css';
import "@/register";
import store from "./store";
import http from './http';
import "../../font/font.scss";
Vue.use(http);
Vue.config.productionTip = false;
// Vue.prototype.$axios = http;
// axios.defaults.baseURL = window.renderUrl;
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
