<template>
  <n-icon>
    <component :is="name" />
  </n-icon>
</template>

<script setup lang="ts">
import type { IconKeyType } from '@/plugins/carbon'

const { name } = defineProps<{
  name: IconKeyType
}>()
</script>

<style scoped>

</style>