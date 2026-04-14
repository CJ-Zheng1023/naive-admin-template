<template>
  <n-select
    v-model:value="value"
    :options
    :loading
    filterable
    clearable
    v-bind="$attrs"
    value-field="id"
    label-field="name"
  />
</template>

<script setup lang="ts">
import type { Value } from 'naive-ui/es/select/src/interface'
import type { SelectOption } from '@/types'
import useLoading from '@/hooks/useLoading'
import type { LoaderType } from './useLoader'
import useLoader from './useLoader'
const { loader } = defineProps<{
  loader: LoaderType
}>()
const value = defineModel<Value | null>('value', { default: null })
const options = ref<SelectOption[]>([])
const { start, stop, loading } = useLoading()
const _load = () => {
  start()
  useLoader(loader).then(data => options.value = data).finally(stop)
}
onMounted(_load)
</script>

<style scoped>

</style>