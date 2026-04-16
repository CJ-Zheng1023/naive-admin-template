import type { MenuTree } from '@/api/menu'
import config from '@/config'
import { ThemeEnum } from '@/enum'
import type { IconKeyType } from '@/plugins/carbon'
import { storage } from '@/utils/storage'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RouteLocationMatched } from 'vue-router'
import { queryPermissions } from '@/api/menu'
export type Page = { fullPath: string; name: string; path: string; icon?: IconKeyType }
export interface IAppState {
  collapsed: boolean
  initialized: boolean
  currentPath: string
  isMd: boolean
  theme: ThemeEnum
  breadcrumbs: { label: string; value: string }[]
  openedPages: Page[]
  menuTree: MenuTree[]
}
export const useAppStore = defineStore('appStore', {
  state: (): IAppState => ({
    collapsed: false,
    initialized: false,
    currentPath: '',
    // 浏览器窗口是否为中等屏幕(宽度大于992px)
    isMd: false,
    theme: storage.get(config.themeKeyName) || ThemeEnum.LIGHT,
    breadcrumbs: [],
    openedPages: [],
    menuTree: []
  }),
  getters: {
    isDark: state => state.theme === ThemeEnum.DARK
  },
  actions: {
    changeCollapsed(flag: boolean) {
      this.collapsed = flag
    },
    changeIsMd(flag: boolean) {
      this.isMd = flag
    },
    changeTheme(theme: ThemeEnum) {
      this.theme = theme
      storage.set(config.themeKeyName, theme)
    },
    updateCurrentPath(newPath: string) {
      this.currentPath = newPath
    },
    getPermissions() {
      return queryPermissions().then(res => {
        this.menuTree = res.data
        this.initialized = true
        return res.data
      })
    },
    reset() {
      this.openedPages = []
      this.breadcrumbs = []
      this.currentPath = ''
      this.initialized = false
    },
    setBreadcrumbs(matched: RouteLocationMatched[]) {
      this.breadcrumbs = matched
        .filter(item => item.name !== config.rootRouteName)
        .map(item => ({
          label: item.name?.toString() || '',
          value: item.path
        }))
    },
    addOrUpdatePage(page: Page) {
      const p = this.openedPages.find(item => item.path === page.path)
      if (p) {
        p.fullPath = page.fullPath
      } else {
        this.openedPages.push(page)
      }
    },
    updatePageNameAndIcon(path: string, name: string, icon: IconKeyType) {
      const p = this.openedPages.find(item => item.path === path)
      if (p) {
        p.name = name
        p.icon = icon
      }
    },
    updateOpenedPages(pages: Page[]) {
      this.openedPages = pages
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
