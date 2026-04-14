<template>
  <n-switch
    :value="value"
    size="medium"
    :unchecked-value="ThemeEnum.LIGHT"
    :checked-value="ThemeEnum.DARK"
    @update:value="handleUpdateValue"
    :rail-style="railStyle"
  >
    <template #checked-icon>
      <Icon name="Moon" />
    </template>
    <template #unchecked-icon>
      <Icon name="Sun" />
    </template>
  </n-switch>
</template>

<script setup lang="ts">
import { ThemeEnum } from '@/enum'
import Icon from '@/components/icon/index.vue'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
const { value = ThemeEnum.LIGHT } = defineProps<{
  value?: ThemeEnum
}>()
const emit = defineEmits<{
  'update:value': [ThemeEnum]
}>()
const handleUpdateValue = (value: ThemeEnum) => {
  emit('update:value', value)
}
const cThemeVars = useCustomThemeVars()
const railStyle = () => {
  return {
    backgroundColor: cThemeVars.value.header.switchRailColor
  }
}
</script>

<style scoped lang="less">
.n-switch{
  :deep(.n-switch__rail){
    border: 1px solid v-bind('cThemeVars.header.switchBorderColor');
    box-sizing: content-box;
    .n-switch__button-icon{
      color: v-bind('cThemeVars.header.switchIconColor');
    }
  }
}
</style>