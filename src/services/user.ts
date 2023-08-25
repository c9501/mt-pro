import request from '@/utils/request'
import type { loginRules } from './types/user.d'
// 密码登录
export const loginByPassword = (loginParams: loginRules) => {
  return request('/login/password', 'POST', loginParams)
}
