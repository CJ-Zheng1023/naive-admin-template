import { DARK_PRIMARY_COLOR } from '@/constant'
import { useAppStore } from '@/store/app'
import { darkToLightColor } from '@/utils/lib'
export default function (originColor: string | null | undefined) {
  const { isDark } = storeToRefs(useAppStore())
  const color = computed(() => {
    const color = originColor || DARK_PRIMARY_COLOR
    return isDark.value ? color : darkToLightColor(color)
  })
  return color
}
