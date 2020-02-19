import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store  = new Vuex.Store({
    // 模块版:
    modules: {permission, user},
    getters: {
        roles: state => state.user.roles //返回当前用户所有角色
    }
    // 简单版：
    // // 数据data
    // state: {
    //     isLogin: false
    // },
    // // 变更状态
    // mutations: {
    //     login (state) {
    //         state.isLogin = true
    //     }
    // },
    // // 异步状态变更
    // actions: {
    //     requestLogin ({commit}) { // 异步登录事件--通过dispatch派发
    //         return new Promise(resolve => {
    //             setTimeout((context) => {
    //                 commit('login')
    //                 resolve(true)
    //             }, 2000)                
    //         })
    //     }
    // }
})
export default store