<template>
  <template v-if="editable">
    <n-input-number
      ref="inputNumberRef"
      v-bind="$attrs"
      v-model:value="realValue"
      :clearable
      style="width: 100%;"
      @blur="handleUpdate"
      size="small"
    />
  </template>
  <template v-else>
    <div title="点击后可切换为修改模式" class="text" @click="editable = true">{{ value }}</div>
  </template>
</template>

<script setup lang="ts">
import type { InputNumberInst } from 'naive-ui'
const { value, clearable = true } = defineProps<{
  value: number | null
  clearable?: boolean
}>()
const emit = defineEmits<{
  'update:value': [number | null]
}>()
const editable = ref(false)
const realValue = ref<number | null>(null)
const inputNumberRef = ref<InputNumberInst>()
watch(editable, newValue => {
  if (newValue) {
    realValue.value = value
    nextTick(() => {
      inputNumberRef.value?.focus()
    })
  }
})
const handleUpdate = () => {
  editable.value = false
  if (value === realValue.value) {
    return
  }
  emit('update:value', realValue.value)
}
</script>

<style scoped lang="less">
.text{
  min-height: 26px;
}
</style>