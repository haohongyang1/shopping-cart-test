import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/about/Home'
import Cart from '@/views/cart/Home'
import Detail from '@/views/detail/Home'
import List from '@/views/list/Home'
import Login from '@/views/login/Home'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 此处未生效 ===== TODO =======
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      beforeEnter(to, from, next) { // 2、 路由独享守卫()
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
// 1、全局前置守卫：每次路由激活之前调用
router.beforeEach((to, from, next) => {
  if ((to.path !== '/login' &&  !window.isLogin)) {
    next({path: '/login?redirect=' + to.path}) // 可以在该位置做一个路由重定向，登陆后继续跳转到刚才想进入的页面
    // next()
    console.log('请登录')
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(false)
    }
  }
})
export default router

