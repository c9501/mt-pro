import request from '@/utils/request'
import type { CodeTypeRules } from './types/user.d'
import type { User ,Code,UserInfo,PatientList, Patient } from '@/types/user.d'
// 密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST',{ mobile, password})
}

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeTypeRules) => {
  return request<Code>('/code', 'GET', { mobile, type })
}
// 短信登录
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}

// 获取个⼈信息
export const getUserInfo = () => request<UserInfo>('/patient/myUser')

//刷新token
export const tokenapi = () => {
  return request('/login','GET',{headers:{
    Authorization:'Bearer '+ localStorage.getItem('refreshToken')
  }})
}
//获取家庭档案信息
export const getPatientList = () => request<PatientList>('/patient/mylist')
// 查询患者详情
export const getPatientDetail = (id: string) => request<Patient>(`/patient/info/${id}`)
