<template>
  <div>
      <my-form :model="form" :rules="rules" ref="formTest">
          <my-form-item label="用户名" prop="userName">
            <my-input type="text" v-model="form.userName"></my-input>
          </my-form-item>
          <my-form-item label="密码" prop="password">
            <my-input type="text" :value="form.password" @input="form.password=$event"></my-input>
          </my-form-item>
          <my-form-item>
              <button @click="submit"> 提交 </button>
          </my-form-item>
      </my-form>
  </div>
</template>

<script>
import MyInput from './Form/MyInput'
import MyFormItem from './Form/MyFormItem'
import MyForm from './Form/MyForm'
export default {
  name: 'FormTest',
  components: {
      MyInput
      , MyFormItem
      , MyForm
  },
  data () {
    return {
        form: {
            userName: "",
            password: ''
        },
        rules: {
            userName: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        }
    }
  },
  methods: {
      submit() {
          this.$refs['formTest'].validate((r) => {
              if (r) {
                  window.isLogin = true
                  if (this.$router.query.redirect) {
                      this.$route.push(this.$router.query.redirect)
                  }
              } else {
                  window.isLogin = false
              }
          })
      }
  }
}
</script>

<style scoped>
</style>
