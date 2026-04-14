<template>
  <n-config-provider
    :theme-overrides="theme === ThemeEnum.DARK ? darkThemeOverrides : lightThemeOverrides"
    :theme="theme === ThemeEnum.DARK ? darkTheme : null"
    :breakpoints="{ s: 576, m: 850, l: 1400, xl: 1800, xxl: 2560 }"
    style="height: 100%;"
  >
    <div class="app-layout" style="height: 100%;display: flex;">
      <app-sider />
      <div style="flex-grow: 1;height: 100%;overflow-x: hidden;">
        <div style="height: 100%;display: flex;flex-direction: column;">
          <app-header />
          <app-content />
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import AppSider from './sider/index.vue'
import AppHeader from './header/index.vue'
import AppContent from './content/index.vue'
import { storeToRefs } from 'pinia'
import { darkTheme } from 'naive-ui'
import { useAppStore } from '@/store/app'
import { ThemeEnum } from '@/enum'
import useResponsiveSidebar from '@/hooks/useResponsiveSidebar'
import useCheckVersion from '@/hooks/useCheckVersion'
import useCheckPassword from '@/hooks/useCheckPassword'
import { lightThemeOverrides, darkThemeOverrides } from '@/constant'
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)

useResponsiveSidebar()
useCheckVersion()
useCheckPassword()

</script>

<style lang="less" scoped>
</style>