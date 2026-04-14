<template>
  <div class="app-breadcrumb">
    <n-breadcrumb separator=">">
      <n-breadcrumb-item :clickable="false" v-for="item in breadcrumbs" :key="item.value">{{ item.label }}</n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
//@ts-ignore
const { breadcrumbs } = storeToRefs(appStore)
</script>

<style scoped>

</style>