<template>
  <div class="app-sider" :style="{ width: `${(collapsed ? config.siderCollapsedWidth : config.siderWidth)}px` }">
    <app-logo />
    <app-menu />
  </div>
</template>

<script setup lang="ts">
import useCollapsed from '@/hooks/useCollapsed'
import AppLogo from './logo.vue'
import AppMenu from './menu.vue'
import config from '@/config'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
const collapsed = useCollapsed()
const cThemeVars = useCustomThemeVars()
</script>

<style scoped>
.app-sider{
  background-color: v-bind('cThemeVars.sider.bgColor');
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
}
</style>