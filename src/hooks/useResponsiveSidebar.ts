import { useMediaQuery } from '@vueuse/core'
import { useAppStore } from '@/store/app'
export default function () {
  const isMd = useMediaQuery('(min-width: 992px)')
  const appStore = useAppStore()
  watchEffect(() => {
    appStore.changeIsMd(isMd.value)
    appStore.changeCollapsed(!isMd.value)
  })
}
