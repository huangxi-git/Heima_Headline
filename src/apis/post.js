// 引入配置好的 axios
import axios from '../utils/request'

export const getPostList = (params) => {
    return axios({
        url: '/post',
        // get 请求 -- 形参用 params 
        params,
    })
};


// 获取指定的id 文章详情数据
export const getPostDetail = (id) => {
    return axios({
        url: '/post/' + id,
    })
}



// 点赞
export const likePost = (id) => {
    return axios({
        url: '/post_like/' + id,
    })
}