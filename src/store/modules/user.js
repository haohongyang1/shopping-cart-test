import { getToken, setToken, removeToken } from "../../../util/utils/auth"

// 存储用户令牌和角色信息
const state = {
    token: getToken(),
    roles: []
    // 其他用户信息
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // 用户登录行为
    login ({commit}, userInfo) {
        const {username} = userInfo
        // 模拟后端请求，获取登录返回结果，如果登录成功，保存token到vuex中
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' || username === 'tom') {
                    commit("SET_TOKEN", username)
                    setToken(username)
                    resolve()
                } else {
                    reject('用户名错误')
                }
            }, 1000)
        })
    },
    // 获取用户信息
    getInfo ({commit, state}) {
        // 模拟后端请求，返回当前角色的可登录路由表
        return new Promise((resolve) => {
            const roles = state.token === 'admin' ? ['admin'] : ['editor']
            commit("SET_ROLES", roles)
            resolve(roles)
        })
    },
    // 重置令牌
    resetToken ({commit}) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "")
            commit("SET_ROLES", [])
            removeToken()
            resolve()
        })
    }
}
export default {
    namespaced: true,
    actions,
    mutations,
    state
}