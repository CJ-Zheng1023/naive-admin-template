import type { ID, Pageable, SelectOption } from '@/types'
import { get, post } from '@/utils/request'

export type RoleForList = {
  id: ID
  name: string
  description: string
}
export type RoleForForm = Omit<RoleForList, 'id'>
export type RoleForShow = RoleForList
export type RoleForSubmit = { id?: ID } & RoleForForm
export type RoleSearchCondition = {
  name: string
}
const URL = {
  createRoleUrl: '/admin/role/create',
  updateRoleUrl: '/admin/role/update',
  removeRoleUrl: '/admin/role/delete',
  queryRoleUrl: '/admin/role/get',
  queryRolesUrl: '/admin/role/page',
  queryRolesForSelectUrl: '/admin/role/list',
  queryMenusUrl: '/admin/role/menu/bind/list',
  bindMenusUrl: '/admin/role/menu/bind'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const createRole = (data: RoleForSubmit) => post(URL.createRoleUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const updateRole = (data: RoleForSubmit) => post(URL.updateRoleUrl, data)
/**
 * 删除
 * @param ids id集合
 * @returns
 */
export const removeRole = (ids: ID[]) => post(URL.removeRoleUrl, ids)
/**
 * 更新前回显操作
 * @param id 会员等级id
 * @returns
 */
export const queryRole = (id: ID) => get<RoleForShow>(URL.queryRoleUrl, { params: { id } })
/**
 * 根据条件分页查询
 * @param pageNo 页码
 * @param pageSize 每页大小
 * @param condition 查询条件
 * @returns
 */
export const queryRoles = (pageNo: number, pageSize: number, condition: RoleSearchCondition) =>
  get<Pageable<RoleForList>>(URL.queryRolesUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryRolesForSelect = () => get<SelectOption[]>(URL.queryRolesForSelectUrl)
/**
 * 查询已绑定菜单
 * @param roleId 角色ID
 * @returns
 */
export const queryMenus = (roleId: ID) => get<ID[]>(URL.queryMenusUrl, { params: { roleId } })
/**
 * 绑定菜单
 * @param roleId 角色ID
 * @param menuIds 菜单ID集合
 * @returns
 */
export const bindMenus = (roleId: ID, menuIds: ID[]) => post(URL.bindMenusUrl, { roleId, menuIds })
