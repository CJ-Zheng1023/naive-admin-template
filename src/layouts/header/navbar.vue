<template>
  <div class="app-navbar">
    <ThemeSwitch :value="theme" @update:value="selectTheme" />
    <div class="divider"></div>
    <NickName :name="realName" />
  </div>
</template>

<script setup lang="tsx">
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { ThemeEnum } from '@/enum'
import { storeToRefs } from 'pinia'
import NickName from './nickName.vue'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
import ThemeSwitch from './themeSwtich.vue'
const appStore = useAppStore()
const { realName } = storeToRefs(useUserStore())
const { theme } = storeToRefs(appStore)
const selectTheme = (key: ThemeEnum) => {
  appStore.changeTheme(key)
}
const cThemeVars = useCustomThemeVars()
</script>

<style scoped lang="less">
.app-navbar{
  .flex(center);
  column-gap: 6px;
  .divider{
    height: 20px;
    width: 1px;
    background-color: v-bind('cThemeVars.common.borderColor');
    margin: 0 8px;
  }
}
</style>