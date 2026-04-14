<template>
  <template v-if="flag">
    <Button name="停用" type="warning" tertiary @click="deactivate" :loading />
  </template>
  <template v-else>
    <Button name="启用" type="success" tertiary @click="activate" :loading />
  </template>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import type { ID } from '@/types'
import { activateUser, deactivateUser } from '@/api/user'
import useLoading from '@/hooks/useLoading'
const { flag, userId } = defineProps<{
  flag: boolean
  userId: ID
}>()
const emit = defineEmits<{
  refresh: []
}>()
const { start, stop, loading } = useLoading()
const deactivate = () => {
  start()
  deactivateUser(userId).then(() => emit('refresh')).finally(stop)
}
const activate = () => {
  start()
  activateUser(userId).then(() => emit('refresh')).finally(stop)
}
</script>

<style scoped>

</style>