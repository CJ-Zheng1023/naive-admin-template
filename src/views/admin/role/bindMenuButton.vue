<template>
  <Button type="success" name="绑定菜单" tertiary @click="menuModalVisible = true" />
  <MenuModal :roleId v-model:visible="menuModalVisible" />
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import MenuModal from './menuModal.vue'
import type { ID } from '@/types'
const { roleId } = defineProps<{
  roleId: ID
}>()
const menuModalVisible = ref(false)
</script>

<style scoped>

</style>