<script setup lang="ts">
import Content from './Content.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import { lightThemeOverrides } from '@/constant'
</script>
<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    style="height: 100%;"
    :theme-overrides="lightThemeOverrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <Content />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
