

// 编译--编译文本+编译节点，主要是根据指定el找到DOM中所有子节点
// new Compiler(el, vm)
class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        if (this.$el) {
            // 提取宿主中模板内容到Fragment标签
            this.$fragment = this.node2Fragment(this.$el)
            // 编译模板内容，同时进行依赖收集
            this.compile(this.$fragment)
            // 编译后添加到DOM
            this.$el.appendChild(this.$fragment)
        } 
    }
    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        // ---- 注意这里循环转移dom技巧 ----- 
        while (child = el.firstChild) {
            // 下次while循环执行firstChild = el.firstChild时读取的是相对本次循环的el.children[1]
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes

        Array.from(childNodes).forEach(node => {
            // 找到元素节点
            if (node.nodeType === 1) {
                this.compileElement(node)
                // console.log(`编译元素节点${node.nodeName}`)
            } else if (this.isInterpolation(node)) {
                this.compileText(node)
                // console.log(`编译插值文本${node.textContent}`)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 是否是插值
    isInterpolation (node) {
        // 是文本节点，并且是在{{}}中定义的
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    compileElement(node) {
        // 处理h-命令
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (this.isDireative(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, this.$vm, exp)
            }
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1)
                this.eventHandler(node, this.$vm, exp, dir)
            }
        })
    }
    isDireative(attr) {
        return attr.indexOf('h-') === 0
    }
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, 'text')
    }
    update(node, vm, exp, dir) {
        let updatrFn = this[dir+'Updator']
        updatrFn && updatrFn(node, vm[exp])
        // 依赖收集+数据读取
        new Watcher(vm, exp, function (value) {
            updatrFn && updatrFn(node, value)
        })
    }
    // v-html指令 显示
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }
    htmlUpdator(node, value) {
        node.innerHtml = value
    }
    // v-text指令 显示
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }
    textUpdator(node, val) {
        node.textContent = val
    }
    // v-modl指令
    model (node, vm, exp) {
        // data 驱动 view
        this.update(node, vm, exp, 'model')
        // view 改变 data
        node.addEventListener('input', e => {
            vm[exp] = e.target.value
        })
    }
    modelUpdator(node, val) {
        node.value = val
    }
    // @click事件注册监听
    eventHandler(node, vm, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }
}
