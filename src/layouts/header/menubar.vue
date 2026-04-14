<template>
  <div class="menubar">
    <div :class="['prev', { disabled: prevDisable }]">
      <n-icon size="24" @click="handlePrev">
        <ChevronLeft />
      </n-icon>
    </div>
    <div :class="['next', { disabled: nextDisable }]">
      <n-icon size="24" @click="handleNext">
        <ChevronRight />
      </n-icon>
    </div>
    <div class="content" ref="contentRef">
      <div class="list" ref="listRef" :style="{ transform: `translateX(-${translateX}px)` }">
        <div
          v-for="tag in openedPages"
          :key="tag.path"
          :data-id="tag.path"
          ref="tagRefs"
          @contextmenu="e => handleContextmenu(e, tag)"
        >
          <n-tag
            :bordered="false"
            :closable="openedPages.length !== 1"
            :type="tag.path === currentPath ? 'primary' : 'default'"
            size="small"
            @click="handleClick(tag.path, tag.fullPath)"
            @close="handleClose(tag.path)"
          >
            <template #icon>
              <n-icon>
                <component :is="tag.icon" />
              </n-icon>
            </template>
            <template #default>{{ tag.name }}</template>
          </n-tag>
        </div>
      </div>
    </div>
  </div>
  <n-dropdown
    trigger="manual"
    placement="bottom-start"
    :show="showDropdown"
    :options="options"
    :x="x"
    :y="y"
    @select="handleSelect"
    @clickoutside="handleClickoutside"
  />
</template>

<script setup lang="tsx">
import { useAppStore, type Page } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useResizeObserver } from '@vueuse/core'
import Icon from '@/components/icon/index.vue'
import useCustomThemeVars from '@/hooks/useCustomThemeVars'
const CLOSE_LEFT = 'closeLeft'
const CLOSE_RIGHT = 'closeRight'
const CLOSE_ALL = 'closeAll'
const CLOSE_OTHER = 'closeOther'
const contentWidth = ref(0)
const listWidth = ref(0)
const tagRefs = ref<HTMLElement[]>()
const listRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const translateX = ref(0)
const showDropdown = ref(false)
const curTag = ref<Parameters<typeof handleContextmenu>[1] | null>(null)
const x = ref(0)
const y = ref(0)
const options = [
  {
    label: '关闭左侧',
    key: CLOSE_LEFT,
    icon: () => <Icon name="ArrowLeft" />
  },
  {
    label: '关闭右侧',
    key: CLOSE_RIGHT,
    icon: () => <Icon name="ArrowRight" />
  },
  {
    label: '关闭其他',
    key: CLOSE_OTHER,
    icon: () => <Icon name="ArrowsHorizontal" />
  },
  {
    label: '关闭所有',
    key: CLOSE_ALL,
    icon: () => <Icon name="Close" />
  }
]
const appStore = useAppStore()
const { currentPath, openedPages } = storeToRefs(appStore)
const selectTagRect = computed(() => {
  if (!tagRefs.value?.length) {
    return {
      left: 0,
      width: 0
    }
  }
  if (!listWidth.value) {
    return {
      left: 0,
      width: 0
    }
  }
  const dom = tagRefs.value.find(dom => dom.getAttribute('data-id') === currentPath.value)
  if (!dom) {
    return {
      left: 0,
      width: 0
    }
  }
  return {
    left: dom.offsetLeft,
    width: dom.offsetWidth
  }
})
const maxTranslateX = computed(() => Math.max(listWidth.value - contentWidth.value, 0))
const prevDisable = computed(() => translateX.value === 0)
const nextDisable = computed(() => translateX.value === maxTranslateX.value)
watchEffect(() => {
  translateX.value = Math.min(selectTagRect.value.left, maxTranslateX.value)
})
const router = useRouter()
const handleClick = (path: string, fullPath: string) => {
  if (path === currentPath.value) {
    return
  }
  router.push(fullPath)
}
const handleClose = (path: string) => {
  const pages = openedPages.value.filter(item => item.path !== path)
  appStore.updateOpenedPages(pages)
  if (path !== currentPath.value) {
    return
  }
  router.push(pages.at(-1)!.fullPath)
}
const handlePrev = () => {
  if (prevDisable.value) {
    return
  }
  translateX.value = Math.max(translateX.value - contentWidth.value, 0)
}
const handleNext = () => {
  if (nextDisable.value) {
    return
  }
  translateX.value = Math.min(translateX.value + contentWidth.value, maxTranslateX.value)
}
const handleContextmenu = (e: MouseEvent, tag: { fullPath: string, name: string, path: string }) => {
  x.value = e.clientX
  y.value = e.clientY
  curTag.value = tag
  showDropdown.value = true
  e.preventDefault()
}
const handleClickoutside = () => {
  curTag.value = null
  showDropdown.value = false
}
const handleSelect = (key: string) => {
  if (!curTag.value) {
    return
  }
  const index = openedPages.value.findIndex(item => item.path === curTag.value?.path)
  if (index === -1) {
    return
  }
  let pages: Page[] = []
  if (key === CLOSE_LEFT) {
    pages = openedPages.value.slice(0, index)
  } else if (key === CLOSE_RIGHT) {
    pages = openedPages.value.slice(index + 1)
  } else if (key === CLOSE_OTHER) {
    pages = [curTag.value]
    router.push(curTag.value.fullPath)
  } else if (key === CLOSE_ALL) {
    pages = openedPages.value.slice(0, 1)
  }
  appStore.updateOpenedPages(pages)
  if (openedPages.value.every(item => item.path !== currentPath.value)) {
    router.push(openedPages.value.at(-1)?.fullPath || '/')
  }
  showDropdown.value = false
}
useResizeObserver(listRef, entries => {
  const entry = entries[0]
  listWidth.value = entry.contentRect.width
})
useResizeObserver(contentRef, entries => {
  const entry = entries[0]
  contentWidth.value = entry.contentRect.width
})
const cThemeVars = useCustomThemeVars()
</script>

<style scoped lang="less">
.menubar{
  color: v-bind('cThemeVars.common.textColor');
  height: 100%;
  position: relative;
  padding: 0 40px;
  border-bottom: 1px dashed v-bind('cThemeVars.common.borderColor');
  .prev, .next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 0;
    &.disabled{
      cursor: not-allowed;
      .n-icon{
        opacity: .24;
      }
    }
  }
  .prev{
    left: 4px;
  }
  .next{
    right: 4px;
  }
  .content{
    height: 100%;
    overflow: hidden;
    .list{
      height: 100%;
      display: inline-flex;
      flex-wrap: nowrap;
      column-gap: 12px;
      align-items: center;
      position: relative;
      transition: transform .4s;
    }
    .n-tag{
      cursor: pointer;
    }
  }
}
</style>