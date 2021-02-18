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
  },
  {
    name: 'createOrder',
    path: '/create-order',
    props: true,
    component: () => import('../views/CreateOrder'),
    meta: {
      index: 2
    }
  },
  {
    name: 'address',
    path: '/address',
    props: true,
    component: () => import('../views/Address'),
    meta: {
      index: 2
    }
  },
  {
    name: 'addressEdit',
    path: '/address-edit',
    props: true,
    component: () => import('../views/AddressEdit'),
    meta: {
      index: 3
    }
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      index: 2
    },
    component: () => import('../views/About.vue'),
  },
  {
    name: 'order',
    path: '/order',
    props: true,
    component: () => import('../views/Order'),
    meta: {
      index: 2
    }
  },
  {
    name: 'orderDetail',
    path: '/order-detail/:orderNo',
    props: true,
    component: () => import('../views/OrderDetail'),
    meta: {
      index: 3
    }
  },
  {
    name: 'setting',
    path: '/setting',
    props: true,
    component: () => import('../views/Setting'),
    meta: {
      index: 3
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
