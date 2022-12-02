
import axios from 'axios'

//axios.create创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 4000,
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization-Type": "apikey",
        "X-APISpace-Token":"ec2a2c4894b847f6a0985e3033e00d0f"
    },
    withCredentials: true,
})

//请求拦截器
service.interceptors.request.use(config => {
    return config
}, err => {
    console.log('请求拦截err' + err)
    return Promise.reject(err)
})

//响应拦截器
service.interceptors.response.use(config => {
    return config
}, err => {
    console.log('响应拦截err' + err)
    return Promise.reject(err)
})

export default service