<template>
  <a v-if="type === RouterTypeEnum.EXTERNAL" :href="path" target="_blank">{{ name }}</a>
  <router-link v-else :to="{ path }">{{ name }}</router-link>
</template>

<script setup lang="ts">
import { RouterTypeEnum } from '@/enum'

const { path, name, type = RouterTypeEnum.INTERNAL } = defineProps<{
  path: string
  name: string
  type?: RouterTypeEnum
}>()
</script>

<style scoped>

</style>