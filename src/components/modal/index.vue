<template>
  <n-modal
    v-bind="$attrs"
    class="custom-modal"
    :style="{ width }"
    :show="visible"
    preset="card"
    :mask-closable="false"
    :bordered="false"
    :trap-focus="false"
    @update:show="handleUpdateShow"
    segmented
    size="small"
    :content-style="bodyStyle"
    to="#app"
  >
    <template #header>
      <n-flex justify="center" style="font-size: 18px;font-weight: 700;">{{ title }}</n-flex>
    </template>
    <template #default>
      <n-spin :show="spinning" style="height: 100%;" :content-style="{ height: '100%' }">
        <slot></slot>
      </n-spin>
    </template>
    <template #footer v-if="showFooter">
      <n-flex justify="end">
        <slot v-if="$slots.extraActions" name="extraActions"></slot>
        <n-button @click="handleCancel" size="small">{{ cancelText }}</n-button>
        <n-button v-if="showOk" @click="handleOk" type="primary" size="small">{{ okText }}</n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

const {
    width = '650px',
    title,
    spinning,
    okText = '确定',
    cancelText = '关闭',
    showOk = true,
    showFooter = true,
    showConfirm,
    confirmContent = '确定要关闭该窗口吗？',
    visible = false,
    bodyStyle = { padding: '12px 36px' }
} = defineProps<{
  width?: string | number
  title: string
  spinning?: boolean
  okText?: string
  cancelText?: string
  showOk?: boolean
  showFooter?: boolean
  showConfirm?: boolean
  confirmContent?: string
  visible?: boolean
  bodyStyle?: CSSProperties
}>()
const emit = defineEmits<{
  'update:visible': [boolean],
  ok: []
}>()
const handleCancel = () => {
  if (showConfirm) {
    window.$dialog.warning({
      title: '提示',
      content: confirmContent,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        emit('update:visible', false)
      }
    })
  } else {
    emit('update:visible', false)
  }
}
const handleOk = () => {
  emit('ok')
}
const handleUpdateShow = (value: boolean) => {
  if (showConfirm && !value) {
    window.$dialog.warning({
      title: '提示',
      content: confirmContent,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        emit('update:visible', value)
      }
    })
  } else {
    emit('update:visible', value)
  }
}
</script>

<style lang="less">
.custom-modal {
  border-radius: 14px;
}
</style>