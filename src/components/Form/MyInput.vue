<template>
    <input :type="type" :value="value" @input="onInput" />
</template>
<script>
/* 
type: text,textarea;
value: input-value
v-model是 “:value和@input”的语法糖（父组件通过@input方法将）
*/
export default {
    name: "myInput",
    props: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value) // input事件发生后通知父组件更新value值
            this.$parent.$emit('validate')
        }
    }
}
</script>>