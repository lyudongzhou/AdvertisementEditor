import axios from "axios";

const getUserId = () => 1;

const instance = axios.create({
  baseURL: '/api',
  transformRequest: [
    function handleUserId(data) {
      data = data || {};
      data.userId = getUserId();
      return data;
    }
  ]
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const {method} = config;
  const userId = getUserId();
  if (method === 'get') {
    config.params = config.params || {};
    config.params.userId = userId;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const {data} = response;
  if (data.success) {
    response.data = data.data;
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const originGet = instance.get;
instance.get = function (url, params, config) {
  config = {...config, params};
  return originGet(url, config);
};

export default {
  install(Vue) {
    Vue.prototype.$axios = instance;
  }
}