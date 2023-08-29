import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',
    component: () => import('@/views/Login/index.vue') ,
    meta: { title: '登录' }
    },
    { path: '/register',
    component: () => import('@/views/Register/index.vue') ,
    meta: { title: '登录' }
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
      },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        { path: '/home',
        component: () => import('@/views/Home/index.vue') ,
        meta: {title: '首页' }
        },
        { path: '/article',
        component: () => import('@/views/Article/index.vue') ,
        meta: {title: '健康百科' }
        },
        { path: '/notify',
        component: () => import('@/views/Notify/index.vue') ,
        meta: {title: '消息通知' }
        },
        { path: '/user',
        component: () => import('@/views/User/index.vue'),
        meta: {title: '个人信息' }
        }
      ]
    }
  ]
})
// 访问权限控制
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

// import '@/permission'
export default router
