import type { MenuTree } from '@/api/menu'
import { MenuTypeEnum } from '@/enum'
import type { RouteRecordRaw } from 'vue-router'
const asyncComponents = import.meta.glob(['/src/views/**/index*.vue', '/src/components/page/index.vue'])
const _getAsyncComponent = (path: string) => {
  return asyncComponents['/src/' + path]
}
/**
 * 构建路由
 * @param permissions 当前用户拥有的菜单权限
 * @param root 父路由
 * @returns
 */
export const buildRoutes = (permissions: MenuTree[]): RouteRecordRaw[] => {
  return permissions.reduce((array: RouteRecordRaw[], item: MenuTree): RouteRecordRaw[] => {
    if (item.type === MenuTypeEnum.DIRECTORY) {
      if (!item.menuList?.length) {
        return array
      }
      const children = buildRoutes(item.menuList)
      if (children.length) {
        const option: RouteRecordRaw = {
          path: item.router,
          name: item.name,
          component: _getAsyncComponent(item.component),
          children
        }
        if (item.redirect) {
          const subItem = children[0]
          option.redirect = subItem.path
        }
        return array.concat(option)
      } else {
        return array
      }
    } else {
      const buttons = item.menuList ? item.menuList.map(b => b.authorizationId) : []
      return array.concat({
        path: item.router,
        name: item.name,
        component: _getAsyncComponent(item.component),
        meta: {
          title: item.name,
          buttons,
          icon: item.icon
        }
      })
    }
  }, [])
}
