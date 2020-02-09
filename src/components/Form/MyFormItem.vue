<template>
    <div>
        <label>{{label}}</label>
        <slot></slot>
        <p>{{errorMessage}}</p>
    </div>
</template>
<script>
import Validator from 'async-validator'
// https://www.npmjs.com/package/async-validator
export default {
    name: "myInput",
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        }
    },
    inject: ['form'], // 在MyForm中provide的form值
    data () {
        return {
            errorMessage: ''
        }
    },
    created() {
        this.$on('validate', this.validate)
    },
    methods: {
        validate() {
            return new Promise((resolve) => {
                let descriptor = {[this.prop]: this.form.rules[this.prop]}
                let validator = new Validator(descriptor)
                validator.validate({[this.prop]: this.form.model[this.prop]}, (errors, fields)=> {
                    if (errors) {
                        this.errorMessage = errors[0].message
                        resolve(false)
                    } else {
                        this.errorMessage = ''
                        resolve(true)
                    }
                })
            })
        }
    }
}
</script>
<style scoped>
p {
    color: red;
    font-size: 12px;
}
</style>