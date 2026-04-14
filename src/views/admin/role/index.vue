<template>
  <div class="container">
    <n-spin :show="loading" style="height: 100%;" :content-style="{ height: '100%' }">
      <Card header-bordered bordered full :body-style="{ padding: 0 }">
        <template #caption>
          <Search v-model:condition="condition" @search="loadData(1)" />
        </template>
        <template #actions>
          <n-space>
            <Button type="primary" icon="Add" name="创建" @click="openFormModal()" />
            <Button type="error" :disabled="!checkedRowKeys.length" icon="Delete" name="删除" @click="batchRemove" :loading="btnLoading" />
          </n-space>
        </template>
        <template #default>
          <n-data-table
            :columns="filteredColumns"
            :data="data"
            :row-key="rowKey"
            :remote="true"
            style="height: 100%;"
            flex-height
            :pagination="pagination"
            v-model:checked-row-keys="checkedRowKeys"
            :scroll-x="tableWidth"
            :bordered="false"
          />
        </template>
      </Card>
    </n-spin>
    <form-modal @refresh="loadData" v-model:visible="formModalVisible" :id="currentId" />
  </div>
</template>

<script setup lang="tsx">
import Card from '@/components/card/index.vue'
import Button from '@/components/button/index.vue'
import FormModal from './formModal.vue'
import Search from './search.vue'
import useTable from '@/hooks/useTable'
import type { RoleForList } from '@/api/role'
import { queryRoles, removeRole } from '@/api/role'
import type { ID } from '@/types'
import { NFlex } from 'naive-ui'
import useLoading from '@/hooks/useLoading'
import EllipsisText from '@/components/ellipsisText/index.vue'
import RemoveButton from '@/components/removeButton/index.vue'
import BindMenuButton from './bindMenuButton.vue'
const checkedRowKeys = ref<ID[]>([])
const formModalVisible =ref(false)
const currentId = ref<ID>()
const { start, stop, loading: btnLoading } = useLoading()
const {
  loading,
  loadData,
  data,
  pagination,
  condition,
  filteredColumns,
  rowKey,
  tableWidth
} = useTable<RoleForList, typeof queryRoles>({
  api: queryRoles,
  params: {
    name: ''
  },
  columns: () => [
    {
      type: 'selection',
      width: 100,
      fixed: 'left'
    },
    {
      title: '名称',
      key: 'name',
      align: 'center',
      width: 150,
      fixed: 'left'
    },
    {
      title: '描述',
      key: 'description',
      align: 'center',
      width: 300,
      render: rowData => <EllipsisText text={rowData.description} />
    },
    {
      title: '操作',
      key: 'operate',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: rowData => (
        <NFlex justify='center' size={[8, 4]}>
          <BindMenuButton
            roleId={rowData.id}
          />
          <Button
            name="修改"
            {
              ...{
                tertiary: true,
                type: 'primary',
                onClick: () => {
                  openFormModal(rowData.id)
                }
              }
            }
          />
          <RemoveButton
            action={() => removeRole([rowData.id])}
              {
              ...{
                onSuccess: () => {
                  loadData()
                }
              }
              }
            />
        </NFlex>
      )
    }
  ]
})
const batchRemove = () => {
  window.$dialog.warning({
    title: '提示',
    content: '确定要删除选中数据吗？',
    positiveText: '确定',
    negativeText: '关闭',
    onPositiveClick: () => {
      start()
      removeRole(checkedRowKeys.value).then(res => {
        window.$message.success(res.msg)
        loadData()
      }).finally(stop)
    }
  })
}
const openFormModal = (id?: ID) => {
  currentId.value = id
  formModalVisible.value = true
}
</script>

<style scoped>

</style>