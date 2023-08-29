import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '../stores/user'
import axios, { type Method } from 'axios'
import type { Data } from '../types/request.d.ts'
import { showToast } from 'vant'
import router from '../router'
import {tokenapi} from  "@/services/user"
const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 1000,
  //请求头
  headers:{
    Authorization:'Bearer ' + localStorage.getItem('token')
  }
})
// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 通过请求头发送token
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
 async (res: AxiosResponse) => {
  //短token
    if(res.data.token){
      const token = res.headers.Authorization.replace('Bearer ', '')
      localStorage.setItem('token', token)
      instance.defaults.headers.Authorization='Bearer ' + localStorage.getItem('token')
    }
    //长token值
    if(res.data.refreshToken){
      const refreshToken=res.headers.refreshtoken.replace('Bearer ', '')
      localStorage.setItem('refreshtoken',refreshToken)
    }
    //过期处理
    if(res.data.code===401){
      await tokenapi()
      res.config.headers.Authorization='Bearer ' + localStorage.getItem('token')
      const resp=await instance.request(res.config)
      return resp
    }
    if (res.data.code !== 10000) {
      // TODO toast
      showToast(res.data.message)
      // 错误的业务码返回出去
      return Promise.reject(res.data)
    }
    return res.data
  },
  (error) => {
    // token过期处理
    if (error.response.status === 401) {
      // 1. 清空本地的用户信息/token pinia用户信息/token
      const store = useUserStore()
      store.delUser()
      // 2. 回到登录页
      router.push(`/login?${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
export default request
