// 1、注册全局组件
import Vue from 'vue'

export default function (Component, props) {
    const instance = new Vue({
        render(h) {
            return h(Component, props)
        }
    }).$mount() // 如果是body下的可以在$mount中指定类似#app，但是如果直接给body元素会报错
    // 将生成元素追加到body中
    document.body.appendChild(instance.$el)
    const comp = instance.$children[0]
    comp.remove = () => {
        document.body.removeChild(instance.$el)
        instance.$destroy // -------- 删除 ------
    }
    return comp
}
// 2、在main.js中定义$create方法
// import create from './create.js'
// Vue.prototype.$create = create

// 3、使用
// this.$create(CartAnim)
