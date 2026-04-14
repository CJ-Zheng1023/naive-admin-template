import 'vue-router'
import { IconKeyType } from '@/plugins/carbon'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    buttons?: string[]
    icon?: IconKeyType
  }
}
