import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import('@/views/Register/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/dep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/fast.vue'),
      meta: { title: '急速问诊' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/illness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '问诊⽀付' }
    }, {
      path: '/user/consult',
      component: () => import('@/views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    }, {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/user/consult/:id',
      component: () => import('@/views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path:'/order/pay',
      component:()=>import('@/views/Order/OrderPay.vue'),
      meta:{
        title:'药品支付'
      }
    },
    {
      path: '/order/pay/result',
      name: 'orderPayResult',
      component: () => import('../views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/order/:id',
      name: 'orderDetail',
      component: () => import('../views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/order/logistics/:id',
      name: 'orderLogistics',
      component: () => import('../views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人信息' }
        }
      ]
    }
  ]
})
// 访问权限控制
import { useUserStore } from '@/stores/user'
router.beforeEach((to) => {
  //加载进度条
  NProgress.start()
  // ⽤户仓库
  const store = useUserStore()
  // 不需要登录的⻚⾯，⽩名单
  const wihteList = ['/login', '/register', '404', '401']
  // //处理标题信息
  // document.title = `优医问诊-${to.meta.title || ''}`
  // 如果没有登录且不在⽩名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})
router.afterEach((to) => {
  // 修改标题
  document.title = `优医问诊-${to.meta.title || ''}`
  NProgress.done()
})
NProgress.configure({
  showSpinner: false
})
// import '@/permission'
export default router
