<template>
  <n-tree-select
    :options="options"
    v-model:value="value"
    filterable
    clearable
    default-expand-all
    v-bind="$attrs"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { queryMenus, type MenuForList } from '@/api/menu'
import { MenuTypeEnum } from '@/enum'
import useLoading from '@/hooks/useLoading'
import type { ID } from '@/types'
const props = defineProps<{
  scope: MenuTypeEnum
}>()
const value = defineModel<ID | null>('value', { required: true })
const options = ref<MenuForList[]>([])
const { loading, start, stop } = useLoading()
onMounted(() => {
  _loadData()
})
const _loadData = () => {
  start()
  queryMenus(props.scope).then(res => {
    options.value = res.data
  }).finally(stop)
}
</script>

<style scoped>

</style>