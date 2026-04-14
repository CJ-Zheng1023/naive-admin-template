import type { MenuTree } from "@/api/menu"
import { MenuTypeEnum } from "@/enum"
import type { MenuOption } from "naive-ui"
import Icon from '@/components/icon/index.vue'
import Link from '@/components/link/index.vue'

/**
 * 构建左侧菜单
 * @param permissions 当前用户拥有的菜单权限
 * @returns { MenuOption[] }
 */
export const buildMenuOptions = (permissions: MenuTree[]): MenuOption[] => {
  return permissions.reduce((array: MenuOption[], item: MenuTree): MenuOption[] => {
    // 去除隐藏菜单
    if ((item.type === MenuTypeEnum.MENU && item.hide)) {
      return array
    }
    const menuOption: MenuOption = {
      key: item.router,
      path: item.router
    }
    menuOption.icon = () => item.icon ? <Icon name={item.icon} /> : null
    if (item.type === MenuTypeEnum.DIRECTORY) {
      // 去除没有子目录或者菜单的目录
      if (!item.menuList?.length) {
        return array
      }
      const children = buildMenuOptions(item.menuList)
      if (children.length) {
        if (children.length > 1) {
          return array.concat({ ...menuOption, label: item.name, children })
        } else {
          return array.concat({ ...menuOption, label: () => <Link path={item.router} name={item.name} /> })
        }
      } else {
        return array
      }
    } else {
      return array.concat({ ...menuOption, label: () => <Link path={item.router} name={item.name} type={item.routerType} /> })
    }
  }, [])
}