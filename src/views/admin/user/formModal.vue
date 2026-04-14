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
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" maxlength="30" show-count clearable />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="form.password" type="password" maxlength="50" clearable show-password-on="mousedown" />
        </n-form-item>
        <n-form-item label="姓名" path="name">
          <n-input v-model:value="form.name" maxlength="30" show-count clearable />
        </n-form-item>
        <n-form-item label="角色" path="roleId">
          <Selector v-model:value="form.roleId" loader="role" />
        </n-form-item>
        <n-form-item label="科室" path="division">
          <n-input v-model:value="form.division" maxlength="50" show-count clearable />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="form.email" maxlength="50" show-count clearable />
        </n-form-item>
        <n-form-item label="电话" path="telephone">
          <n-input v-model:value="form.telephone" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="职务" path="duties">
          <n-input v-model:value="form.duties" maxlength="50" show-count clearable />
        </n-form-item>
        <n-form-item label="状态" path="active">
          <BooleanSwitch v-model:value="form.active" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { createUser, updateUser, queryUser, type UserForShow, type UserForForm, type UserForSubmit } from '@/api/user'
import type { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import type { FormInst, FormItemRule } from 'naive-ui'
import BooleanSwitch from '@/components/booleanSwitch/index.vue'
import Selector from '@/components/selector/index.vue'
import { encryptByRSA } from '@/utils/lib'

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
} = useFormModal<UserForShow, UserForForm, UserForSubmit>({
  id: toRef(props, 'id'),
  visible,
  formRef,
  addApi: createUser,
  updateApi: updateUser,
  queryApi: queryUser,
  createDefault: () => ({
    username: '',
    password: '',
    name: '',
    email: '',
    telephone: '',
    active: true,
    duties: '',
    roleId: null,
    division: ''
  }),
  rules: {
    username: {
      required: true,
      message: '请输入用户名',
      trigger: 'input'
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'input'
    },
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'input'
    },
    roleId: {
      type: 'number',
      required: true,
      message: '请选择角色',
      trigger: 'change'
    },
    division: {
      required: true,
      message: '请输入科室',
      trigger: 'input'
    },
    telephone: {
      validator: (_: FormItemRule, value: any) => {
        if (!value) {
          return true
        }
        if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value)) {
          return new Error('请输入有效号码')
        }
      },
      trigger: 'input'
    },
    email: {
      validator: (_: FormItemRule, value: any) => {
        if (!value) {
          return true
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          return new Error('请输入有效邮箱')
        }
      },
      trigger: 'input'
    }
  }
})

const handleOk = () => {
  const data: UserForSubmit = { ...form }
  if (!ifCreate.value) {
    data.id = props.id
  }
  data.password = encryptByRSA(data.password)
  save(data)?.then(res => {
    window.$message.success(res.msg)
    emit('refresh')
    visible.value = false
  })
}
</script>

<style scoped lang="less">

</style>
