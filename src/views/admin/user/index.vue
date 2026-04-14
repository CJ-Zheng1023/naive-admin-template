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
import type { UserForList } from '@/api/user'
import { queryUsers, removeUser } from '@/api/user'
import type { ID } from '@/types'
import { NFlex, NTag } from 'naive-ui'
import useLoading from '@/hooks/useLoading'
import ToggleActivateButton from './toggleActivateButton.vue'

const checkedRowKeys = ref<ID[]>([])
const formModalVisible = ref(false)
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
} = useTable<UserForList, typeof queryUsers>({
  api: queryUsers,
  params: {
    username: '',
    name: '',
    roleId: null
  },
  columns: () => [
    {
      type: 'selection',
      width: 50,
      fixed: 'left'
    },
    {
      title: '用户名',
      align: 'center',
      key: 'username',
      width: 150,
      fixed: 'left'
    },
    {
      title: '姓名',
      align: 'center',
      key: 'name',
      width: 150
    },
    {
      title: '邮箱',
      key: 'email',
      align: 'center',
      width: 200
    },
    {
      title: '电话',
      key: 'telephone',
      align: 'center',
      width: 150
    },
    {
      title: '角色',
      key: 'roleName',
      align: 'center',
      width: 150,
      render: rowData => (
        <NTag type='primary' size="small" bordered={false}>{rowData.roleName}</NTag>
      )
    },
    {
      title: '科室',
      key: 'division',
      align: 'center',
      width: 150
    },
    {
      title: '职务',
      key: 'duties',
      align: 'center',
      width: 150
    },
    {
      title: '状态',
      key: 'active',
      align: 'center',
      width: 100,
      render: rowData => (
        <NTag type={rowData.active ? 'success' : 'error'} size="small" round={true}>
          {rowData.active ? '启用' : '停用'}
        </NTag>
      )
    },
    {
      title: '操作',
      key: 'operate',
      width: 250,
      align: 'center',
      fixed: 'right',
      render: rowData => (
        <NFlex justify='center' size={[8, 4]}>
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
          <ToggleActivateButton
            userId={rowData.id}
            flag={rowData.active}
            {
              ...{
                onRefresh: loadData
              }
            }
          />
          <RemoveButton
            action={() => removeUser([rowData.id])}
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
      removeUser(checkedRowKeys.value).then(res => {
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
