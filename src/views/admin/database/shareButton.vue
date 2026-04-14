<template>
  <Button type="warning" name="分享" tertiary @click="modalVisible = true" />
  <Modal
    title="分享专病库"
    width="480px"
    v-model:visible="modalVisible"
    :spinning="loading"
    @ok="handleOk"
  >
    <n-form label-placement="left" :model="form" ref="formRef" :rules>
      <n-form-item label="选择用户" path="userIds" style="position: relative;">
        <UserSelector v-model:value="form.userIds" />
        <div v-if="form.userIds.length" class="select-hint">
          <n-text :depth="3">已选择{{ form.userIds.length }}个用户</n-text>
        </div>
      </n-form-item>
    </n-form>
  </Modal>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import Modal from '@/components/modal/index.vue'
import type { ID } from '@/types'
import { shareDatabase, querySharedUsers } from '@/api/database'
import useLoading from '@/hooks/useLoading'
import type { FormInst, FormRules } from 'naive-ui'
import UserSelector from './userSelector.vue'

const { databaseId } = defineProps<{
  databaseId: ID
}>()
const modalVisible = ref(false)
const form = reactive<{ userIds: ID[] }>({
  userIds: []
})
const formRef = useTemplateRef<FormInst>('formRef')
watch(modalVisible, value => {
  if (value) {
    _loadData()
  } else {
    form.userIds = []
  }
})
const rules: FormRules = {
  userIds: {
    type: 'array',
    required: true,
    message: '请选择用户',
    trigger: 'change'
  }
}
const { loading: loading, start: start, stop: stop } = useLoading()
const _loadData = () => {
  querySharedUsers(databaseId).then(res => form.userIds = res.data)
}

const handleOk = () => {
  formRef.value?.validate().then(() => {
    start()
    return shareDatabase(databaseId, form.userIds)
  }).then(res => {
    window.$message.success(res.msg)
    modalVisible.value = false
  }).finally(stop)
}
</script>

<style scoped lang="less">
.select-hint{
  position: absolute;
  right: 0;
  bottom: -24px;
  font-size: 12px;
  font-style: italic;
}
</style>
