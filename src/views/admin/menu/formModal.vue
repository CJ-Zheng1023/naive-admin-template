<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    :spinning="loading"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="140"
        require-mark-placement="right-hanging"
        label-align="right"
      >
        <n-form-item label="菜单类型" path="type">
          <n-radio-group @update:value="handleUpdateMenuType" :disabled="!ifCreate" v-model:value="form.type">
            <n-flex>
              <n-radio label="目录" :value="MenuTypeEnum.DIRECTORY" :disabled="isButton" />
              <n-radio label="菜单" :value="MenuTypeEnum.MENU" :disabled="isButton" />
              <n-radio label="按钮" :value="MenuTypeEnum.BUTTON" :disabled="!isButton" />
            </n-flex>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="名称" path="name">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item :label="isButton ? '上级菜单' : '上级目录'" path="parentId">
          <tree-select
            :disabled="!ifCreate"
            v-model:value="form.parentId"
            :scope="isButton ? MenuTypeEnum.MENU : MenuTypeEnum.DIRECTORY"
            keyField="id"
            labelField="name"
            childrenField="menuList"
          />
        </n-form-item>
        <n-form-item label="路由地址" path="router" v-if="form.type !== MenuTypeEnum.BUTTON">
          <n-input v-model:value="form.router" />
        </n-form-item>
        <n-form-item label="地址类型" path="routerType" v-if="form.type === MenuTypeEnum.MENU">
          <n-radio-group @update:value="handleUpdateRouterType" v-model:value="form.routerType">
            <n-flex>
              <n-radio :value="RouterTypeEnum.INTERNAL" label="内部链接" />
              <n-radio :value="RouterTypeEnum.EXTERNAL" label="外部链接" />
            </n-flex>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="前端组件" path="component" v-if="form.type !== MenuTypeEnum.BUTTON && form.routerType !== RouterTypeEnum.EXTERNAL">
          <n-input v-model:value="form.component" />
        </n-form-item>
        <n-form-item label="图标" path="icon" v-if="form.type !== MenuTypeEnum.BUTTON">
          <icon-picker v-model:value="form.icon" />
        </n-form-item>
        <n-form-item label="序号" path="orderNum">
          <n-input-number :min="0" v-model:value="form.orderNum" clearable style="width: 100%;" />
        </n-form-item>
        <n-form-item label="是否重定向" path="redirect" v-if="form.type === MenuTypeEnum.DIRECTORY">
          <boolean-switch v-model:value="form.redirect" />
        </n-form-item>
        <n-form-item label="隐藏菜单" path="hide" v-if="form.type === MenuTypeEnum.MENU">
          <boolean-switch v-model:value="form.hide" />
        </n-form-item>
        <n-form-item label="授权标识" path="authorizationId" v-if="form.type === MenuTypeEnum.BUTTON">
          <n-input v-model:value="form.authorizationId" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import TreeSelect from './treeSelect.vue'
import BooleanSwitch from '@/components/booleanSwitch/index.vue'
import { createMenu, updateMenu, queryMenu, type MenuForShow, type MenuForForm, type MenuForSubmit } from '@/api/menu'
import { MenuTypeEnum, RouterTypeEnum } from '@/enum/index'
import IconPicker from '@/components/iconPicker/index.vue'
import { useFormModal } from '@/hooks/useFormModal'
import type { ID } from '@/types'
import type { FormInst } from 'naive-ui'
const props = defineProps<{
  id?: ID
  parentId?: ID
  isButton?: boolean
}>()
const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const visible = defineModel<boolean>('visible', { default: false })
const formRef = useTemplateRef<FormInst>('formRef')
watchEffect(() => {
  if (visible.value) {
    if (props.isButton) {
      form.type = MenuTypeEnum.BUTTON
    } else {
      form.type = MenuTypeEnum.DIRECTORY
    }
    form.parentId = props.parentId || null
  }
})
const {
  rules,
  save,
  form,
  title,
  loading,
  ifCreate,
  resetForm
} = useFormModal<MenuForShow, MenuForForm, MenuForSubmit>({
  id: toRef(props, 'id'),
  visible,
  formRef,
  addApi: createMenu,
  updateApi: updateMenu,
  queryApi: queryMenu,
  createDefault: () => ({
    type: MenuTypeEnum.DIRECTORY,
    name: '',
    parentId: null,
    router: '',
    component: '',
    icon: null,
    orderNum: null,
    hide: false,
    authorizationId: '',
    routerType: null,
    redirect: false
  }),
  rules: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'input'
    },
    router: {
      required: true,
      message: '请输入路由地址',
      trigger: 'input'
    },
    routerType: {
      type: 'number',
      required: true,
      message: '请选择地址类型',
      trigger: 'change'
    },
    component: {
      required: true,
      message: '请输入前端组件',
      trigger: 'input'
    },
    authorizationId: {
      required: true,
      message: '请输入授权标识',
      trigger: 'input'
    }
  }
})
const handleOk = () => {
  const data: MenuForSubmit = {
    ...form
  }
  if (!ifCreate.value) {
    data.id = props.id
  }
  save(data)?.then(res => {
    window.$message.success(res.msg)
    emit('refresh')
    visible.value = false
  })
}

const handleUpdateMenuType = (type: MenuTypeEnum) => {
  resetForm({ type, parentId: form.parentId })
}
const handleUpdateRouterType = () => {
  form.component = ''
}
</script>

<style scoped>

</style>