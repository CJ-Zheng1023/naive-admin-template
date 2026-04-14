import type { MenuTypeEnum, RouterTypeEnum } from '@/enum'
import type { IconKeyType } from '@/plugins/carbon'
import type { ID } from '@/types'
import { get, post } from '@/utils/request'
const URL = {
  queryPermissionsUrl: '/admin/user/menu/permissions',
  createMenuUrl: '/admin/menu/create',
  updateMenuUrl: '/admin/menu/update',
  removeMenuUrl: '/admin/menu/delete',
  queryMenuUrl: '/admin/menu/get',
  queryMenusUrl: '/admin/menu/list',
  updateOrderUrl: '/admin/menu/update/order'
}
/**
 * 菜单树数据结构
 */
export type MenuTree = Directory | Menu
/**
 * 菜单列表数据结构
 */
export type MenuForList = Directory | Menu | Button
/**
 * 目录数据结构
 */
type Directory = {
  type: MenuTypeEnum.DIRECTORY
  name: string
  router: string
  orderNum: number
  component: string
  id: ID
  parentId?: ID
  icon?: IconKeyType
  menuList?: Array<MenuTree>
  redirect: boolean
}
/**
 * 菜单数据结构
 */
type Menu = {
  type: MenuTypeEnum.MENU
  name: string
  router: string
  hide: boolean
  orderNum: number
  component: string
  id: ID
  parentId: ID
  icon?: IconKeyType
  menuList?: Array<Button>
  routerType: RouterTypeEnum
}
/**
 * 按钮数据结构
 */
type Button = {
  type: MenuTypeEnum.BUTTON
  name: string
  orderNum: number
  id: ID
  parentId: ID
  authorizationId: string
}
/**
 * 查询当前登录用户拥有的访问权限
 * @returns
 */
export const queryPermissions = () => get<MenuTree[]>(URL.queryPermissionsUrl)
export type MenuForForm = {
  type: MenuTypeEnum | null
  name: string
  router: string
  component: string
  parentId: ID | null
  icon: IconKeyType | null
  orderNum: number | null
  hide: boolean
  authorizationId: string
  routerType: RouterTypeEnum | null
  redirect: boolean
}
export type MenuForSubmit = MenuForForm & { id?: ID }
export type MenuForShow = MenuForForm & { id: ID }
/**
 * 创建菜单
 * @param data
 * @returns
 */
export const createMenu = (data: MenuForSubmit) => post(URL.createMenuUrl, data)
/**
 * 修改菜单
 * @param data
 * @returns
 */
export const updateMenu = (data: MenuForSubmit) => post(URL.updateMenuUrl, data)
/**
 * 删除菜单
 * @param ids
 * @returns
 */
export const removeMenu = (ids: ID[]) => post(URL.removeMenuUrl, ids)
/**
 * 查询菜单，用于修改场景回显
 * @param id
 * @returns
 */
export const queryMenu = (id: ID) => get<MenuForShow>(URL.queryMenuUrl, { params: { id } })
/**
 * 查询菜单列表
 * @param scope
 * @returns
 */
export const queryMenus = (scope: MenuTypeEnum) => get<MenuForList[]>(URL.queryMenusUrl, { params: { scope } })
/**
 * 更新序号
 * @param id
 * @param orderNum
 * @returns
 */
export const updateOrder = (id: ID, orderNum: number | null) => post(URL.updateMenuUrl, { id, orderNum })
