<template>
  <n-form
    inline
    :model="condition"
    label-placement="left"
    :show-feedback="false"
  >
    <n-form-item label="用户名">
      <n-input :maxlength="60" v-model:value="condition.username" clearable @update:value="handleUpdate" />
    </n-form-item>
    <n-form-item label="姓名">
      <n-input :maxlength="60" v-model:value="condition.name" clearable @update:value="handleUpdate" />
    </n-form-item>
    <n-form-item label="角色">
      <Selector v-model:value="condition.roleId" loader="role" @update:value="handleUpdate" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import type { UserSearchCondition } from '@/api/user'
import { useDebounceFn } from '@vueuse/core'
import Selector from '@/components/selector/index.vue'

const condition = defineModel<UserSearchCondition>('condition', { required: true })

const emit = defineEmits<{
  search: []
}>()

const handleUpdate = useDebounceFn(() => {
  emit('search')
}, 500)
</script>

<style scoped>

</style>
