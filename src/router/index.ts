import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
// module routers
import { getModuleRoutes, getModuleViewComponents } from './constantRoutes'

const moduleRoutes = getModuleRoutes()
getModuleViewComponents()
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'home', hidden: false },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  }
]
  // @ts-ignore
  .concat(moduleRoutes)

// default routes, it will not change to menus
const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('@/components/404/index.vue')
      }
    ]
  },
  {
    path: '/users',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'center',
        name: 'user-center',
        meta: { title: '个人中心' },
        component: () => import('@/views/user/center.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue')
  }
]

const routes = constantRoutes.concat(defaultRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由滚动
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

export function bootstrapRouter(app: App) {
  app.use(router)
}

export default router
