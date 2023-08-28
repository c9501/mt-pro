// 访问权限控制
import { useRouter } from "vue-router"
const router = useRouter()
import {useUserStore} from '@/stores/user'
router.beforeEach((to) => {
  // ⽤户仓库
  const store = useUserStore()
  // 不需要登录的⻚⾯，⽩名单
  const wihteList = ['/login','/register','404','401']
  //处理标题信息
  document.title = `优医问诊-${to.meta.title || ''}`
  // 如果没有登录且不在⽩名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})
