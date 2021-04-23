// 引入配置好的 axios
import axios from '../utils/request'

export const getPostList = (data) => {
    return axios({
        url: `/post?category=${data}&pageSize=40`,

    })
}