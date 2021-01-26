import axios from "axios";

const getUserId = () => {
  if (PRODUCTION) {
    return JSON.parse(window.localStorage.getItem("saber-userInfo")).content.id;
  }
  return '111';
};

const createInstance = ({$message}) => {
  const instance = axios.create({
    baseURL: '/openapi',
    // headers: {'Content-Type': 'application/json;charset=UTF-8'},
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [
      function handleUserId(data) {
        if(data instanceof FormData){
          data.append("userId",getUserId());
          return data;
        }
        console.log("fmt");
        data = data || {};
        data.userId = getUserId();
        return data;
      },
      function (data) {
        if(data instanceof FormData){
          return data;
        }
        console.log("fmt");
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      },
      ...axios.defaults.transformRequest,
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
    } else {
      // todo 走到错误回调
      // $message({type: 'error', message: data.message || '操作失败！'});
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    $message({type: 'error', message: error.message || '操作失败！'});
    return Promise.reject(error);
  });

  const originGet = instance.get;
  instance.get = function (url, params, config) {
    config = {...config, params};
    return originGet(url, config);
  };

  return instance;
}

export default {
  install(Vue) {
    Vue.prototype.$axios = createInstance(Vue.prototype);
  }
}