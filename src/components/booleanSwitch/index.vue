<template>
  <n-switch v-model:value="value" v-bind="$attrs">
    <template #checked>{{ positiveText }}</template>
    <template #unchecked>{{ negativeText }}</template>
  </n-switch>
</template>

<script setup lang="ts">
const { positiveText = '是', negativeText = '否' } = defineProps<{
  positiveText?: string
  negativeText?: string
}>()
const value = defineModel<boolean>('value')
</script>

<style scoped>

</style>