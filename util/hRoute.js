import VueRouter from "vue-router"

// 用法：
const routes = [
    {path: '/', component: Home}
]
const router = new VueRouter(Vue, { routes })
new Vue({
    el: '#app',
    router
})

// 自己实现一个简单（不嵌套）的vue-router


class VueRouter{
    constructor (Vue, options) {
        this.$options = options
        this.routeMap = {} // 路由映射对象：通过path找到指定的components
        this.vm = new Vue(
            {
                data: {
                    current: '#/' // 当前路由（hash模式）
                }
            }
        )
        this.init()
        this.createRouteMap(options)
        this.initComponent(Vue)
    }
    // 初始化 hashchange
    init () {
        window.addEventListener('load', this.onHashChange.bin(this), false)
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    }
    // 形成路由映射对象
    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component
        })
    }
    // 注册组件
    initComponent(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render: function (h) {
                return h(
                    "a",
                    {attrs: {href: this.to}},
                    this.$slots.default
                )
            }
        })
        const _this = this
        Vue.component('router-view', {
            render(h) {
                var component = _this.routeMap[_this.app.current]
                return h(component)
            }
        })
    }
    getHash() {
        return window.location.hash.slice(1) || '/'
    }
    onHashChange() {
        this.vm.current = this.getHash()
    }
}