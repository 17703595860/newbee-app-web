import axios from 'axios'
import { Toast } from 'vant'
import router from "@/router";
// import router from "../router"

// 基础的请求地址
axios.defaults.baseURL = process.env.NODE_HOME == 'development' ? 'http://127.0.0.1:9002/' : 'http://127.0.0.1:9002/'
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
      return Promise.resolve(response.data)
    },
    error => {
      const response = error.response
      if (!response) {
        Toast.fail('服务器异常')
        return Promise.reject(error)
      }
      const data = response.data
      if (response.status === 401) {
        // 返回401，没有登录状态，路由跳转到login页面，
        // 这里的 window.vRouter是在main.js中绑定到window上的，window.VRouter = router
        localStorage.removeItem("token")
        router.push({path: '/login'})
      } else if (response.status === 403) {
        // 返回403，没有权限
        Toast.fail('没有权限')
      } else if (response.status === 404) {
        // 返回403，没有权限
        Toast.fail('没有找到对应资源')
      } else {
        Toast.fail(data.message ? data.message : '系统异常')
      }
      return Promise.reject(error)
    }
)

export default axios
