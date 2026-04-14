import { useAppStore } from '@/store/app'
import { getThemeConfig } from '@/theme'
export default function () {
  const { theme } = storeToRefs(useAppStore())
  const vars = computed(() => {
    return getThemeConfig(theme.value)
  })
  return vars
}
