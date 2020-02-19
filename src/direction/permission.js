import store from '../store/index'
/**
 * 使用方式： v-permission='["admin", "editor"]'
 */

const permission = {
    // 指令已经添加到元素上，el-指令相关dom元素，binding-对象
    // 参数：el: 可用于直接操作dom元素；binding：{name: 'permission', expression:'foo=1',value: true}
    inserted (el, binding) {
        const { value: pRoles } = binding
        // 获取用户角色
        const roles = store.getters && store.getters.roles
        if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
            const hasPermission = roles.some(role => pRoles.includes(role))
            // 如果没有权限就直接删除当前dom
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组`)
        }
    }
}
export default permission