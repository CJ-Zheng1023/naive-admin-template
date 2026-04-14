import * as icons from '@vicons/carbon'
import { type App } from 'vue'
import { objectKeys } from '@/utils/lib'
export const iconKeys = objectKeys(icons)
// 注册图标库组件
const install = (app: App) => {
  iconKeys.forEach(key => {
    app.component(key, icons[key])
  })
}
export type IconKeyType = keyof typeof icons
export default {
  install
}
