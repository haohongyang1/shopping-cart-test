// 路由全局守卫
// 权限控制逻辑
import router from './index'
import store from '../store/index'
import {getToken} from '../../util/utils/auth'

const whiteList = ['/login'] // 无需令牌白名单
router.beforeEach(async (to, from, next) => {
    console.log(to.path)
    // 获取令牌判断用户是否登录
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === './login') {
            next({path: '/'})
        } else {
            // 判断用户信息是否存在
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // 用户信息获取，完成 根据角色生成动态路由操作，并且 保存在cookie中；
                    const roles = await store.dispatch("user/getInfo")
                    console.log(roles)
                    const accessRoles = await store.dispatch("permission/generateRoutes", roles)
                    router.addRoutes(accessRoles) // 异步添加动态路由
                    next({...to, replace: true}) // ==== 
                } catch (e) {
                    await store.dispatch('user/resetToken')
                    console.log(e || 'Has Error')
                    next(`/login?rediect=${to.path}`)
                }
            }
        }
    } else {
        // 用户无令牌
        if (whiteList.includes(to.path)) {
            next() //白名单路由放过
        } else {
            // 重定向到登录页
            next(`/login?rediect=${to.path}`)
        }
    }
})