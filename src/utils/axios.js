import axios from "axios"
import {Toast} from 'vant'
import router from "../router"

// 基础的请求地址
axios.defaults.baseURL = process.env.NODE_HOME == 'development' ? 'http://127.0.0.1:9002/api' : 'http://127.0.0.1:9002/api'
// 跨域请求是否要携带cookie，
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// post请求，发送json形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 判断用户是通过token来实现，用拦截器实现
// axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''
axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = localStorage.getItem('token') || ''
      return config
    },
    error => {
      return Promise.reject(error)
    }
);

// interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截器处理后返回
axios.interceptors.response.use(
    response => {
      if (typeof response.data !== 'object') {
        Toast.fail('服务端异常')
        return Promise.reject(new Error(response.data))
      }
      const resultCode = response.data.resultCode
      if (resultCode != 200) {
        if (response.data.message) Toast.fail(response.data.message)
        if (resultCode == 401) {
          // 返回401，没有登录状态，路由跳转到login页面，
          // 这里的 window.vRouter是在main.js中绑定到window上的，window.VRouter = router
          router.push({path: '/login'})
        }
        if (resultCode == 403) {
          // 返回403，没有权限
          Toast.fail('没有权限')
        }
        return Promise.reject(response.data)
      }
      return response.data
    },
    error => {
      Toast.fail(error.message ? error.message : '系统异常')
      return Promise.reject(error)
    }
)

export default axios