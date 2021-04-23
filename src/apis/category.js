// 引入配置好的 axios
import axios from '../utils/request'

export const getCateList = () => {
    return axios({
        url: '/category'
    })
}