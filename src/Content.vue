<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage, useDialog, useNotification } from 'naive-ui'
const router = useRouter()
const loadingBar = useLoadingBar()
router.beforeEach(() => {
  loadingBar?.start()
})
router.afterEach(() => {
  loadingBar?.finish()
})
window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
</script>

<style scoped>

</style>