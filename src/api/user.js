// api调用统一文件
import $axios from '../../util/utils/request'
export function login(data) {
    return $axios({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return $axios({
        url: '/user/info',
        method: 'get'
    })
}