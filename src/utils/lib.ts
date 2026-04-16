import { generate } from '@ant-design/colors'
import dayjs from 'dayjs'
import JSEncrypt from 'jsencrypt'
import { escapeRegExp, isNil } from 'lodash-es'
/**
 * 获取对象key数组
 * @param obj
 * @returns
 */
export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof typeof obj>
}
/**
 * 根据给定的颜色生成相配套的一组颜色
 * @param mainColor
 * @param isDark
 * @returns
 */
export const generateColor = (mainColor: string, isDark: boolean = false): [string, string, string] => {
  const colors = generate(mainColor, { theme: isDark ? 'dark' : 'default' })
  return [colors[5], colors[4], colors[6]]
}
const encrypt = new JSEncrypt()
encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGxuxrtLtqPUSX47mCZjwGoNdG
E9sFsNu94qSI7uSu4dWzgfSZmEOpb6fRH8ZE/D0XOb1KcrXbmnhDY7uTtITuNxqR
qPzoSoAEKRPJbWITxy4nNAGRWg3e9NyhpO6Xu9p/5bkDRjggEV6Qs8mi+UQFodAB
G3dhp4ly7wPojy5rfwIDAQAB
-----END PUBLIC KEY-----`)
export const encryptByRSA = (source: string) => {
  return encrypt.encrypt(source) || ''
}
/**
 * 判断输入内容是否包含在目标字符串里
 * @param source 输入内容
 * @param target 目标字符串
 * @returns
 */
export const regExpTest = (source: string, target: string) => new RegExp(escapeRegExp(source), 'i').test(target)
/**
 * dark色转light色
 * @param hexColor
 * @returns
 */
export const darkToLightColor = (hexColor: string) => {
  // hex -> hsl
  const r = parseInt(hexColor.slice(1, 3), 16) / 255
  const g = parseInt(hexColor.slice(3, 5), 16) / 255
  const b = parseInt(hexColor.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // 转换策略：
  // - 亮度从 dark 的高亮(~0.6-0.9)映射到 light 的中低亮度(~0.35-0.5)
  // - 饱和度略降，避免在白底上过于刺眼
  const lightL = 0.55 - (l - 0.5) * 0.3 // dark 越亮，light 越暗
  const lightS = Math.min(s * 0.75, 0.75) // 饱和度压缩到 75%

  // hsl -> hex
  const c = (1 - Math.abs(2 * lightL - 1)) * lightS
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lightL - c / 2

  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (h < 60) [r1, g1, b1] = [c, x, 0]
  else if (h < 120) [r1, g1, b1] = [x, c, 0]
  else if (h < 180) [r1, g1, b1] = [0, c, x]
  else if (h < 240) [r1, g1, b1] = [0, x, c]
  else if (h < 300) [r1, g1, b1] = [x, 0, c]
  else [r1, g1, b1] = [c, 0, x]

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`
}
/**
 * 计算年龄
 * @param date
 * @returns
 */
export const calculateAge = (date: number | null | undefined) => {
  if (isNil(date)) {
    return '-'
  }
  const birthDay = dayjs(date)
  const now = dayjs()
  return now.diff(birthDay, 'year')
}
