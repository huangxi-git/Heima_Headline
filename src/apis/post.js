// 引入配置好的 axios
import axios from '../utils/request'

export const getPostList = (params) => {
    return axios({
        url: '/post',
        // get 请求 -- 形参用 params 
        params,
    })
}