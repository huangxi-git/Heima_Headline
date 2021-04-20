// 引入 axios 
import axios from 'axios';

// 添加默认配置，
// 方式1:
axios.defaults.baseURL = 'http://157.122.54.189:9083';
// 方式2：
// const axios = axios.create({
//     baseURL: 'http://157.122.54.189:9083',
// })

// 暴露
export default axios;