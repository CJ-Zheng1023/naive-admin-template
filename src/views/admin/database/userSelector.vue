<template>
  <n-select
    :multiple
    :loading
    filterable
    clearable
    label-field="name"
    value-field="id"
    v-model:value="value"
    :render-label="renderLabel"
    :options="data"
    :render-tag="renderTag"
    :disabled
    max-tag-count="responsive"
  />
</template>

<script setup lang="tsx">
import { queryUsersForSelect } from '@/api/user'
import useLoading from '@/hooks/useLoading'
import type { ID } from '@/types'
import { NFlex, NTag, NText } from 'naive-ui'
import type { SelectOption, Value } from 'naive-ui/es/select/src/interface'
const { multiple = true, showOther = true, disabled = false } = defineProps<{
  multiple?: boolean
  showOther?: boolean
  disabled?: boolean
}>()
const value = defineModel<Value | null | undefined>('value')
const { start, stop, loading } = useLoading()
const data = ref<{ id: ID, name: string, division: string }[]>([])
const _load = () => {
  start()
  queryUsersForSelect().then(res => data.value = res.data).finally(stop)
}
onMounted(_load)
const renderLabel = (option: { id: ID, name: string, division: string }) => {
  return (
    <NFlex size={[2, 0]} vertical={true} { ...{ style: { padding: '4px 0' } } }>
      <div style="font-size: 15px;">{option.name}</div>
      {
        showOther && option.division ? <NText style="font-size: 12px;" depth={3}>{ '<' + option.division + '>'}</NText> : null
      }
    </NFlex>
  )
}
const renderTag = ({ option, handleClose }: { option: SelectOption, handleClose: () => void }) => {
  if (multiple) {
    return (
      <NTag
        bordered={true}
        closable={!disabled}
        size="medium"
        type="default"
        {
          ...{
            onClose: handleClose
          }
        }
      >
        {option.name}
      </NTag>
    )
  } else {
    return (
      <div>{option.name}</div>
    )
  }
}
</script>

<style scoped lang="less">

</style>