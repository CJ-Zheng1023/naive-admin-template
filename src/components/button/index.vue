<template>
  <n-button v-bind="$attrs" :size="size" :title="tooltip || ''">
    <template #icon>
      <n-icon v-if="icon">
        <component :is="icon" />
      </n-icon>
      <slot v-else name="icon"></slot>
    </template>
    <template #default>
      <template v-if="name">{{ name }}</template>
      <slot v-else name="default"></slot>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import type { IconKeyType } from '@/plugins/carbon'
const { size = 'small', tooltip = false } = defineProps<{
  icon?: IconKeyType
  name?: string
  size?: 'large' | 'medium' | 'small' | 'tiny'
  tooltip?: string | false
}>()


</script>

<style scoped></style>