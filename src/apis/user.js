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

// 根据用户 id 获取用户详情  --  /user/:id
export const getUserDetail = (id) => {
    return axios({
        // 传 id 方法 -- 拼接
        url: `/user/${id}`,
        // 传递 自定义的请求头，我们在
        // headers: { Authorization: localStorage.getItem('heimatoutiao_loginToken') },
    })
}


export const updateUserInfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data,
    })
}