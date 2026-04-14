<template>
  <n-dropdown @select="selectOption" placement="bottom-end" :options="menuOptions">
    <div class="nick-name">
      <n-avatar round size="small" src="/avatar.png" />
      <span style="margin: 0 8px;">{{ name || '阿富汗' }}</span>
      <n-icon class="icon" size="16">
        <component is="ChevronDown" />
      </n-icon>
    </div>
  </n-dropdown>
</template>

<script setup lang="tsx">
import Icon from '@/components/icon/index.vue'
import { NIcon, useThemeVars } from 'naive-ui'
import { logout } from '@/api/user'
import { reset } from '@/router'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import config from '@/config'
defineProps<{
  name: string
}>()
const themeVars = useThemeVars()
const USER_MENU_LOGOUT_KEY = 'logout'
const USER_MENU_CHANGE_PASSWORD = 'password'
const menuOptions = [
  {
    label: '修改密码',
    key: USER_MENU_CHANGE_PASSWORD,
    icon: () => (
      <Icon name="Password" />
    )
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: USER_MENU_LOGOUT_KEY,
    icon: () => (
      <Icon name="Logout" />
    )
  }
]
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const selectOption = (key: string) => {
  if (key === USER_MENU_LOGOUT_KEY) {
    logout().then(res => {
      window.$message.success(res.msg)
    }).finally(() => {
      reset()
      appStore.reset()
      userStore.reset()
      router.push(config.pathLogin)
    })
  } else if (key === USER_MENU_CHANGE_PASSWORD) {
    
  }
}
</script>

<style scoped lang="less">
.nick-name {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: v-bind('themeVars.textColor1');
  .icon{
    transform: rotate(0deg);
    transform-origin: center;
    transition: transform .3s .2s;
  }
  &:hover {
    color: v-bind('themeVars.textColor3');
    .icon{
      transform: rotate(180deg);
    }
  }
}
</style>