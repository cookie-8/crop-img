import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: '', // api的base_url
    timeout: 10000,
})

// response拦截器
service.interceptors.response.use(
    response => {
        const { data } = response
        if (typeof data !== 'object') {
            return Promise.reject()
        }
        return response
    },
    error => {
        // 接口请求错误统一处理

        return Promise.reject(error)
    },
)

export default service
