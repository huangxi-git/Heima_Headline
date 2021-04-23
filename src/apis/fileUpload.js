// 引入配置好的 axios
import axios from '../utils/request'


export const fileUpload = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data,
    });

};