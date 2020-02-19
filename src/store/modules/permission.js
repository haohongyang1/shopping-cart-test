import {asyncRoutes, constRoutes} from '../../router/index'

/**
 * 判断是否有访问权限
 * @param {*} roles 用户拥有角色
 * @param {*} route 待判定的路由
 */
export function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 过滤无权访问的路由
 * @param {*} routes 路由表
 * @param {*} roles 角色
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        // 复制一份新的
        let tmp = {...route}
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(route)
        }
    })
    return res
}

const state = {
    routes: [], // 完整路由表
    addRoutes: [] // 用户可以访问的除了白名单路由外，他可以访问的列表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        // 拼接完整路由表
        state.routes = constRoutes.concat(routes)
    }
}

const actions = {
    // 动态路由生成，在得到用户角色后第一时间调用
    generateRoutes ({ commit }, roles) {
        console.log(roles)
        return new Promise(resolve => {
            let accessRoute
            if (Array.from(roles).includes('admin')) {
                accessRoute = asyncRoutes || []
            } else {
                accessRoute = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessRoute)
            resolve(accessRoute)
        })
    }
}

export default {
    namespaced: true, // 通过该属性使其成为带命名空间的模块，当模块被注册后，可以根据模块注册的路径调整命名
    state,
    mutations,
    actions
}