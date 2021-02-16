import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'home'
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('../views/Home'),
    meta: {
      index: 1
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('../views/Category'),
    meta: {
      index: 1
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/Cart'),
    meta: {
      index: 1
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('../views/User'),
    meta: {
      index: 1
    }
  },
  {
    name: 'goodsDetail',
    path: '/goods-detail/:id',
    props: true,
    component: () => import('../views/GoodsDetail'),
    meta: {
      index: 2
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/Login'),
    meta: {
      index: 2
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/Login'),
    meta: {
      index: 2
    }
  },
  {
    name: 'searchList',
    path: '/search-list',
    component: () => import('../views/SearchList'),
    meta: {
      index: 2
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
