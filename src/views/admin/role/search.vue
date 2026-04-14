<template>
  <n-form
    inline
    :model="condition"
    label-placement="left"
    :show-feedback="false"
  >
    <n-form-item label="名称">
      <n-input :maxlength="60" v-model:value="condition.name" clearable @update:value="handleUpdate" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import type { RoleSearchCondition } from '@/api/role'
import { useDebounceFn } from '@vueuse/core'
const condition = defineModel<RoleSearchCondition>('condition', { required: true })
  const emit = defineEmits<{
  search: []
}>()
const handleUpdate = useDebounceFn(() => {
  emit('search')
}, 500)
</script>

<style scoped>

</style>