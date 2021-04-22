import axios from '../utils/request';


export const fileUpload = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data,
    });

};