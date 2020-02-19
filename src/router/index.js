import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import About from '@/views/about/Home'
import Cart from '@/views/cart/Home'
import Detail from '@/views/detail/Home'
import List from '@/views/list/Home'
import Login from '@/views/login/Home'

Vue.use(Router)
// 通用页面 
export const constRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
// 权限访问
export const asyncRoutes = [
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      roles: ['admin']
    },
    beforeEnter(to, from, next) { // 2、 路由独享守卫()
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      roles: ['editor', 'admin']
    }
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      roles: ['editor', 'admin']
    }
  }
]
export default new Router({
  mode: 'history',
  routes: constRoutes
})
// 1、全局前置守卫：每次路由激活之前调用
// router.beforeEach((to, from, next) => {
//   if ((to.path !== '/login' &&  !store.state.isLogin)) {
//     next({path: '/login?redirect=' + to.path}) // 可以在该位置做一个路由重定向，登陆后继续跳转到刚才想进入的页面
//     console.log('请登录')
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next()
//     }
//   }
// })
// export default router

