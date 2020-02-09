<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
/* 
提交时进行表单的校验
*/
export default {
    name: "myInput",
    provide() {
        return {
            form: this // 表单实例传递给后代
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object,
            default: ""
        }
    },

    methods: {
        onInput(e) {
            console.log(e.target.value)
            this.$emit('input', e.target.value)
        },
        async validate(cb) {
            // 拿到所有需要校验的item
            let tasks = this.$children.filter(item => item.prop).map(item => item.validate())
            let result = await Promise.all(tasks)
            console.log(result)
            if (result.every(item => !item)){
                cb(false)
            }else {
                cb(true)
            }
            
        }
    }
}
</script>