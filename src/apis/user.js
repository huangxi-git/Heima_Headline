// 专门添加与用户相关操作的 api 方法

// 引入配置好的 axios
import axios from '../utils/request'

// 用户登录
// 按需导出： export const 
export const userLogin = (value) => {
    return axios({
        method: 'post',
        url: '/login',
        data: value,
    })
}

export const userRegister = (value) => {
    return axios({
        method: 'post',
        url: '/register',
        data: value,
    })
}