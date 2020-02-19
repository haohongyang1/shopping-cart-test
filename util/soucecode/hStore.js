// 自己实现一个vuex
class myStore{
    constructor(options) {
        this.state = options.state
        this.mutations = options.mutations
        this.actions = options.actions
        this.vm = new Vue({ // 委托给Vue，实现了数据响应式
            data:{state: state}
        })
    }
    commit (type, payload) {
        const mutaion = this.mutations[type]
        mutaion(this.state, payload)
    }
    dispatch (type, payload) {
        const action = this.actions[type]
        const ctx = {
            commit: this.commit.bind(this),
            state: this.state, //....and so on
        }
        return action(ctx, payload)
    }
}