<template>
  <div class="app-header">
    <div class="nav">
      <app-breadcrumb />
      <app-navbar />
    </div>
    <div class="menu">
      <Menubar />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './navbar.vue'
import AppBreadcrumb from './breadcrumb.vue'
import Menubar from './menubar.vue'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
const cThemeVars = useCustomThemeVars()
</script>

<style scoped lang="less">
.app-header{
  background-color: v-bind('cThemeVars.header.bgColor');
  height: @headerHeight;
  flex-shrink: 0;
  box-shadow: v-bind('cThemeVars.header.boxShadow');
  @navHeight: 50px;
  .nav{
    height: @navHeight;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed v-bind('cThemeVars.common.borderColor');
  }
  .menu{
    height: @headerHeight - @navHeight;
  }
}
</style>