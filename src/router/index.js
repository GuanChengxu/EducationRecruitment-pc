import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const newRoutes = [
  { // 首页
    path: '/',
    component: () => import('@/views/index')
  },
  { // 报名须知
    path: '/agreement',
    component: () => import('@/views/signUp/agreement')
  },
  { // 开始报名
    path: '/startSignUp',
    component: () => import('@/views/signUp/startSignUp')
  },
  { // 报名成功
    path: '/signUpSuccess',
    component: () => import('@/views/signUp/signUpSuccess')
  },
  { // 报名简章
    path: '/detail',
    component: () => import('@/views/detail/detail')
  },
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: newRoutes
})

const router = createRouter()

export default router
