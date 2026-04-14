import router from '.'
import config from '@/config'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import Layouts from '@/layouts/index.vue'
import { buildRoutes } from './helper'

const whiteList = [config.pathLogin, config.path404, config.path403]

export const useGuard = () => {
  const appStore = useAppStore()
  const userStore = useUserStore()

  router.beforeEach(async to => {
    document.title = to.meta.title ?? ''
    const token = userStore.token

    // 已登录
    if (token) {
      // 在白名单
      if (whiteList.includes(to.path)) {
        if (to.path === config.pathLogin) {
          return '/' // 重定向到首页
        }
        return true // 放行
      }

      // 已初始化
      if (appStore.initialized) {
        appStore.addOrUpdatePage({
          path: to.path,
          fullPath: to.fullPath,
          name: to.meta.title || '',
          icon: to.meta.icon
        })
        return true // 放行
      }
      try {
        const menuTree = await appStore.getPermissions()
        const subRoutes = buildRoutes(menuTree)
        const route = {
          path: '/',
          redirect: subRoutes?.[0]?.path || config.path403,
          name: config.rootRouteName,
          component: Layouts,
          children: subRoutes
        }
        router.addRoute(route)
        router.addRoute({
          name: config.redirect404RouteName,
          path: '/:pathMatch(.*)*',
          redirect: config.path404
        })

        // 重定向到目标页
        return { ...to, replace: true }
      } catch (e) {
        console.log(e)
        return config.path403 // 失败去403
      }
    }

    // 未登录
    if (!token) {
      if (to.path === config.pathLogin) {
        return true // 放行登录页
      } else {
        return config.pathLogin // 去登录
      }
    }
    // 兜底
    return true
  })
}
