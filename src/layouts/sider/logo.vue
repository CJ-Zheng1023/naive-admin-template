<template>
  <div class="app-logo">
    <img src="@/assets/images/logo.png" :width="collapsed ? 32 : 30" />
    <span style="margin-left: 8px;" :class="['brand-name', collapsed ? 'brand-name-hidden' : '']">
      <span>专病数据科研平台</span>
    </span>
    <div class="collapse-button" @click="toggleCollapse">
      <n-icon size="24" :class="{ 'rotate-180': collapsed }">
        <CollapseIcon />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import useCollapsed from '@/hooks/useCollapsed'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
import CollapseIcon from '@/assets/svg/collapse-icon.svg'
const appStore = useAppStore()
const collapsed = useCollapsed()
const toggleCollapse = () => {
  appStore.changeCollapsed(!collapsed.value)
}
const cThemeVars = useCustomThemeVars()
</script>

<style scoped lang="less">
.app-logo{
  flex-shrink: 0;
  height: @headerHeight;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed v-bind('cThemeVars.sider.borderColor');
  position: relative;
  @collapseButtonSize: 30px;
  .brand-name{
    font-size: 18px;
    color: #fff;
    opacity: 1;
    transition: opacity 0.3s 0.6s;
    visibility: visible;
    &.brand-name-hidden{
      visibility: hidden;
      opacity: 0;
    }
  }
  .collapse-button{
    box-shadow: v-bind('cThemeVars.sider.buttonBoxShadow');
    background-color: v-bind('cThemeVars.sider.buttonBgColor');
    height: @collapseButtonSize;
    width: @collapseButtonSize;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    right: -(@collapseButtonSize / 2);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      .n-icon{
        color: v-bind('cThemeVars.sider.buttonTextColorHovered');
      }
    }
    .n-icon{
      color: v-bind('cThemeVars.sider.buttonTextColor');
      transition: transform 0.4s;
      &.rotate-180{
        transform: rotate(180deg);
      }
    }
  }
}
</style>