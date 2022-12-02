import axios from 'axios'

//axios.create创建axios实例
const instance = axios.create({
    baseURL: '/api',
    timeout: 4000,
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization-Type": "apikey",
        "X-APISpace-Token":"ilohqa5r8ynw0o0bu35ux2urcpcss8tj"
    },
    withCredentials: true,
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config
}, err => {
    console.log('请求拦截err' + err)
    return Promise.reject(err)
})

//响应拦截器
instance.interceptors.response.use(config => {
    return config
}, err => {
    console.log('响应拦截err' + err)
    return Promise.reject(err)
})

export default instance