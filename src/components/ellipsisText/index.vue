<template>
  <n-ellipsis :tooltip="{ scrollable: true, contentStyle: { maxHeight: '80px', maxWidth: '230px', padding: '4px' } }">{{ text }}</n-ellipsis>
</template>

<script setup lang="ts">
const { text } = defineProps<{
  text: string
}>()
</script>

<style scoped>

</style>