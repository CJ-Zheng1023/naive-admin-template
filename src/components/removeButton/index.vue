<template>
  <n-popconfirm :onPositiveClick="handleOk">
    <template #default>确定要删除选中数据吗？</template>
    <template #trigger>
      <Button :name type="error" :loading :tertiary v-bind="$attrs" />
    </template>
  </n-popconfirm>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import useLoading from '@/hooks/useLoading'
import type { IResponse } from '@/types'
const { action, tertiary = true, name = '删除' } = defineProps<{
  action: () => Promise<IResponse<Object>>
  tertiary?: boolean
  name?: string
}>()
const emit = defineEmits<{
  success: []
}>()
const { loading, start, stop } = useLoading()
const handleOk = () => {
  start()
  action().then(({ msg }) => {
    window.$message.success(msg)
    emit('success')
  }).finally(stop)
}
</script>

<style scoped>

</style>