// 自己做一个路由History的管理

const History = {
    _history: [],
    install(Vue) {
        Object.defineProperty(Vue.prototype, "$routerHistory", {
            get() {
                return History
            }
        })
    },
    push() {
        this._history.push(path)
    },
    pop() {
        this._history.pop(path)
    },
    canBack() {
        return this._history.length > 0
    }
}
export default History