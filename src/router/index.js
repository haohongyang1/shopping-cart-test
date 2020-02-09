import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FormTest from '@/components/FormTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/FormTest',
      name: 'FormTest',
      component: FormTest
    }
  ]
})
