import { useUserStore } from '../stores/user'
// import router from '@/router'
import axios from 'axios'
// import { Toast } from 'vant'

const instance = axios.create({
  baseURL: '',
  timeout: 1000
})
// 2. 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)
