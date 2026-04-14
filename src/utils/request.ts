import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/user'
import { isNil } from 'lodash-es'
import type { IResponse } from '@/types'
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000
})
http.interceptors.request.use(
  con => {
    con.headers!.token = useUserStore().token
    if (con.method === 'get') {
      const params: Record<string, unknown> = {}
      // 剔除值为null,undefined和空字符串的属性
      Object.entries(con.params || {}).forEach(([key, value]) => {
        if (!isNil(value) && value !== '') {
          params[key] = value
        }
      })
      params['t'] = +new Date()
      con.params = params
    }
    return con
  },
  error => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  async response => {
    // 二进制流直接返回response对象
    if (['blob', 'arraybuffer'].includes(response.request?.responseType)) {
      return response
    }
    const res = response.data
    const { code, msg } = res
    if (code === 200) {
      return res
    } else {
      window.$message.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    const message = error.message
    if (message !== 'Network Error' && message !== 'canceled') {
      window.$message.error(message)
    }
    return Promise.reject(new Error(message))
  }
)
/**
 * 封装get请求
 * @param url
 * @param config
 * @returns
 */
export const get = <T extends Object | null>(url: string, config?: AxiosRequestConfig) => {
  return http.get<T, IResponse<T>>(url, config)
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const post = <T extends Object>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return http.post<T, IResponse<T>>(url, data, config)
}
// 下载
export const getBlob = (url: string, config?: AxiosRequestConfig) => {
  const baseConfig: AxiosRequestConfig = {
    timeout: 0
  }
  const con = config ? Object.assign(baseConfig, config) : baseConfig
  con.responseType = 'blob'
  con.url = url
  return http(con)
}
