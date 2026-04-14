import type { ID, Pageable } from '@/types'
import { get, post } from '@/utils/request'

export type DatabaseForList = {
  id: ID
  name: string
  description: string
}
export type DatabaseForForm = Omit<DatabaseForList, 'id'>
export type DatabaseForShow = DatabaseForList
export type DatabaseForSubmit = { id?: ID } & DatabaseForForm
export type DatabaseSearchCondition = {
  name: string
}
const URL = {
  createDatabaseUrl: '/admin/database/create',
  updateDatabaseUrl: '/admin/database/update',
  removeDatabaseUrl: '/admin/database/delete',
  queryDatabaseUrl: '/admin/database/get',
  queryDatabasesUrl: '/admin/database/page/all',
  shareDatabaseUrl: '/admin/database/user/share'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const createDatabase = (data: DatabaseForSubmit) => post(URL.createDatabaseUrl, data)
/**
 * 修改
 * @param data 提交对象
 * @returns
 */
export const updateDatabase = (data: DatabaseForSubmit) => post(URL.updateDatabaseUrl, data)
/**
 * 删除
 * @param ids id集合
 * @returns
 */
export const removeDatabase = (ids: ID[]) => post(URL.removeDatabaseUrl, ids)
/**
 * 更新前回显操作
 * @param id 数据库id
 * @returns
 */
export const queryDatabase = (id: ID) => get<DatabaseForShow>(URL.queryDatabaseUrl, { params: { id } })
/**
 * 根据条件分页查询
 * @param pageNo 页码
 * @param pageSize 每页大小
 * @param condition 查询条件
 * @returns
 */
export const queryDatabases = (pageNo: number, pageSize: number, condition: DatabaseSearchCondition) =>
  get<Pageable<DatabaseForList>>(URL.queryDatabasesUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 分享专病库给用户
 * @param databaseId 专病库id
 * @param userIds 用户id集合
 * @returns
 */
export const shareDatabase = (databaseId: ID, userIds: ID[]) => post(URL.shareDatabaseUrl, { databaseId, userIds })
/**
 * 查询获得该专病库分享的用户
 * @param databaseId
 * @returns
 */
export const querySharedUsers = (databaseId: ID) => get<ID[]>(`/admin/database/${databaseId}/bind/user/id/list`)
