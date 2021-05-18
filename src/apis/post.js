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

// 收藏
export const starPost = (id) => {
    return axios({
        url: '/post_star/' + id,
    })
}


// 评论
export const getPostComment = (id, params) => {
    return axios({
        url: '/post_comment/' + id,
        params: {
            pageSize: 50
        }
    })
}


// 评论
export const publishComment = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}


// 搜索
export const searchPost = (keyword) => {
    return axios({
        url: '/post_search?keyword=' + keyword,
    })
}