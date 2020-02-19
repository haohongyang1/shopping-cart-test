// 对axios做拦截
/**
 * 请求拦截：设置令牌头部x-token
 * 响应拦截：登录过期等统一状态码拦截
 */

import axios from 'axios'

import {getToken} from '../utils/auth'
import store from '../../src/store'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // 跨域时若发送cookies需设置该选项
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 1) {
            console.log('request.response', res.message)
            // 假设与后端约定好一下code码含义：10008-非法令牌；10012-其他客户端已登录；10014-令牌过期
            if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
                if (confirm('登录异常，请重新登录') === true) {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                }else {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                }
            }
            return Promise.reject(new Error(res.message))
        } else {
            return res
        }
    },
    error => {
        console.log('request.error', error.message)
        return Promise.reject(error)
    }

)

export default service