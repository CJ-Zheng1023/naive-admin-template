import type { ID, Pageable } from '@/types'
import { get, post } from '@/utils/request'

const URL = {
  loginUrl: '/admin/user/login',
  logoutUrl: '/admin/user/logout',
  createUserUrl: '/admin/user/create',
  updateUserUrl: '/admin/user/update',
  removeUserUrl: '/admin/user/delete',
  queryUserUrl: '/admin/user/get',
  queryUsersUrl: '/admin/user/page',
  activateUrl: '/admin/user/status/active',
  deactivateUrl: '/admin/user/status/inactive',
  queryUsersForSelectUrl: '/admin/user/list'
}

export type UserInfo = {
  realName: string
  token: string
  ifLocked: boolean
  lockedTime: number
  ifAutoLogOff: boolean
  autoLogOffTime: number
}

export type UserForList = {
  id: ID
  username: string
  password: string
  name: string
  email: string
  telephone: string
  active: boolean
  duties: string
  roleName: string
  division: string
}

export type UserForForm = {
  username: string
  password: string
  name: string
  email: string
  telephone: string
  active: boolean
  duties: string
  roleId: ID | null
  division: string
}
export type UserForShow = UserForForm & { id: ID }
export type UserForSubmit = { id?: ID } & UserForForm

export type UserSearchCondition = {
  username: string
  name: string
  roleId: ID | null
}

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export const login = (username: string, password: string) => post<UserInfo>(URL.loginUrl, { username, password })

/**
 * 登出
 * @returns
 */
export const logout = () => post(URL.logoutUrl)

/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const createUser = (data: UserForSubmit) => post(URL.createUserUrl, data)

/**
 * 修改
 * @param data 提交对象
 * @returns
 */
export const updateUser = (data: UserForSubmit) => post(URL.updateUserUrl, data)

/**
 * 删除
 * @param ids id集合
 * @returns
 */
export const removeUser = (ids: ID[]) => post(URL.removeUserUrl, ids)

/**
 * 更新前回显操作
 * @param id 用户id
 * @returns
 */
export const queryUser = (id: ID) => get<UserForShow>(URL.queryUserUrl, { params: { id } })

/**
 * 根据条件分页查询
 * @param pageNo 页码
 * @param pageSize 每页大小
 * @param condition 查询条件
 * @returns
 */
export const queryUsers = (pageNo: number, pageSize: number, condition: UserSearchCondition) =>
  get<Pageable<UserForList>>(URL.queryUsersUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 启用
 * @param userId
 * @returns
 */
export const activateUser = (userId: ID) => post(URL.activateUrl, { userId })
/**
 * 停用
 * @param userId
 * @returns
 */
export const deactivateUser = (userId: ID) => post(URL.deactivateUrl, { userId })
/**
 * 查询用户列表，用于下拉框
 * @returns
 */
export const queryUsersForSelect = () => get<{ id: ID; name: string; division: string }[]>(URL.queryUsersForSelectUrl)
