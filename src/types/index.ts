export interface IResponse<T extends Object | null> {
  data: T
  msg: string
  code: number
}
export type ID = number
/**
 * 分页数据结构
 */
export interface IPagination {
  pageNo: number
  pageSize: number
  total: number
}
/**
 * 可分页对象数据结构
 */
export type Pageable<T> = {
  list: T[]
  pagination: IPagination
}
export type ColumnConfigType = {
  key: string
  name: string
  checked: boolean
}
export type NaiveUIType = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
export type SelectOption = {
  id: ID
  name: string
}
