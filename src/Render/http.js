import axios from "axios";

// const getUserId = () => {
//   if (PRODUCTION) {
//     const userId = getPropByPath(JSON.parse(window.localStorage.getItem('saber-userInfo')) || {}, 'content.id');
//     if (!userId) {
//       location.replace(window.__config__.loginUrl);
//     }
//     return userId;
//   }
//   return '112';
// };
var ajax = new XMLHttpRequest();
// 2、建立连接
// true:请求为异步  false:同步
ajax.open("GET", "http://rmtwh.dcc2u.com/openapi/weather/get?needday=7", true);
// ajax.setRequestHeader("Origin",STATIC_PATH); 

ajax.setRequestHeader("Access-Control-Allow-Origin","*");   
// // 响应类型    
ajax.setRequestHeader('Access-Control-Allow-Methods', '*');    
// // 响应头设置    
ajax.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');  
ajax.withCredentials = true;
// 3、发送请求
ajax.send(null);

// 4、监听状态的改变
ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
        if (ajax.status === 200) {
            // 用户传了回调才执行
            // isJson默认值为true，要解析json
            // if (isJson === undefined) {
            //     isJson = true;
            // }
            // var res = isJson ? JSON.parse(ajax.responseText == "" ? '{}' : ajax.responseText) : ajax.responseText;
            // succCb && succCb(res);
            console.log("success");
        } 
        // else {
        //     // 请求失败
        //     // failCb && failCb();
        // }

    }
}
const createInstance = ({$message}) => {
  const instance = axios.create({
    baseURL: window.renderUrl,
    // headers: {'Content-Type': 'application/json;charset=UTF-8'},
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*'},
    transformRequest: [
      function handleUserId(data) {
        if(data instanceof FormData){
          return data;
        }
        data = data || {};
        return data;
      },
      function (data) {
        if(data instanceof FormData){
          return data;
        }
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
    if (method === 'get') {
      config.params = config.params || {};
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