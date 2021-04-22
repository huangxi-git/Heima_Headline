// 引入 axios 
import axios from 'axios';

// 添加默认配置，
// 方式1:
axios.defaults.baseURL = 'http://157.122.54.189:9083';
// 方式2：
// const axios = axios.create({
//     baseURL: 'http://157.122.54.189:9083',
// })


// 添加请求拦截
axios.interceptors.request.use(function (config) {
    // console.log(config);
    let token = localStorage.getItem('heimatoutiao_loginToken');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.message == '用户信息验证失败！' || response.data.message == '用户信息验证失败') {
        Toast.fail('用户信息验证失败！')
        window.location.href = '#/login';
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 暴露
export default axios;