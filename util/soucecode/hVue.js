// 
// new MyVue({
//     data: {msg: 'hello'}
// })
// -------- 问题： 

class HVue {
    constructor (options) {
        this.$options = options
        this.$data = options.data
        // 响应化
        this.observe(this.$data)

        // new Watcher()
        // this.$data.msg
        // new Watcher()
        // this.$data.foo

        if (options.created) {
            options.created.call(this)
        }
        new Compile(options.el, this)
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            // 代理到vm上
            this.proxyData(key)
        })
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
    defineReactive (obj, key, val) {
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal !== val) {
                    val = newVal
                    // 通知依赖
                    dep.notify()
                }
            }
        })
        this.observe(val)
    }
}
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor (vm, key, cb) { // 当前vm、当前key、更新函数cb
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        this.vm[this.key] // 添加Watcher到dep
        Dep.target = null
    }
    update() {
        this.cb.call(this.vm, this.vm[this.key])
    }
}
