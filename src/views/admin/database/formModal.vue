<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    :spinning="loading"
    width="500px"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        label-align="right"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="form.name" maxlength="30" show-count clearable />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="form.description" maxlength="100" show-count clearable type="textarea" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { createDatabase, updateDatabase, queryDatabase, type DatabaseForShow, type DatabaseForForm, type DatabaseForSubmit } from '@/api/database'
import type { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import { pick } from 'lodash-es'
import type { FormInst } from 'naive-ui'
const props = defineProps<{
  id?: ID
}>()
const visible = defineModel<boolean>('visible', { default: false })
const formRef = useTemplateRef<FormInst>('formRef')
const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const {
  rules,
  save,
  form,
  title,
  loading,
  ifCreate
} = useFormModal<DatabaseForShow, DatabaseForForm, DatabaseForSubmit>({
  id: toRef(props, 'id'),
  visible,
  formRef,
  addApi: createDatabase,
  updateApi: updateDatabase,
  queryApi: queryDatabase,
  createDefault: () => ({
    name: '',
    description: ''
  }),
  rules: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'input'
    }
  }
})
const handleOk = () => {
  const data: DatabaseForSubmit = pick(form, ['name', 'description'])
  if (!ifCreate.value) {
    data.id = props.id
  }
  save(data)?.then(res => {
    window.$message.success(res.msg)
    emit('refresh')
    visible.value = false
  })
}
</script>

<style scoped lang="less">

</style>
