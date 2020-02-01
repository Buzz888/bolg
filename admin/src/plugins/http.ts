import axios from 'axios'
import vue from 'vue'
import router from '../router';
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api/admin'
})
http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
http.interceptors.response.use(res => {
    return res //=>成功的操作
}, err => {
    //失败的操作: 
    if (err.response.status === 401) {
        vue.prototype.$message({
            message: '请重新登录!!!',
            type: 'warning'
        });
        router.push('/login')
        localStorage.removeItem('token')  
    }

})

export default http