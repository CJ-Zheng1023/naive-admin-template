<template>
  <div class="app-menu">
    <n-scrollbar style="height: 100%;">
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="config.siderCollapsedWidth"
        :options="menuOptions"
        :indent="24"
        :value
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="tsx">
import config from '@/config'
import useCollapsed from '@/hooks/useCollapsed'
import { useAppStore } from '@/store/app'
import { buildMenuOptions } from './helpers'
import type { MenuOption } from 'naive-ui'
const collapsed = useCollapsed()
const appStore = useAppStore()
const route = useRoute()
const { menuTree } = storeToRefs(appStore)
watchEffect(() => {
  appStore.updateCurrentPath(route.path)
  appStore.setBreadcrumbs(route.matched)
})

const menuOptions = computed(() => {
  return buildMenuOptions(menuTree.value)
})
const value = ref<string>()
const _findSelectPath = (menuOptions: MenuOption[], curPath: string) => {
  let path = ''
  for(const m of menuOptions) {
    if (m.children) {
      path = _findSelectPath(m.children, curPath)
    } else {
      path = m.path as string
    }
    if (path && curPath.includes(path)) {
      break
    } else {
      path = ''
    }
  }
  return path
}
watch(route, r => {
  const paths = r.matched.map(item => item.path).reverse()
  let path = ''
  for(const p of paths) {
    path = _findSelectPath(menuOptions.value, p)
    if (path) {
      break
    }
  }
  value.value = path
}, {
  immediate: true
})
</script>

<style scoped lang="less">
.app-menu{
  flex-grow: 1;
  height: 0;
}
</style>