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
import type { DatabaseForList } from '@/api/database'
import { queryDatabases, removeDatabase } from '@/api/database'
import type { ID } from '@/types'
import { NFlex } from 'naive-ui'
import useLoading from '@/hooks/useLoading'
import EllipsisText from '@/components/ellipsisText/index.vue'
import ShareButton from './shareButton.vue'
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
} = useTable<DatabaseForList, typeof queryDatabases>({
  api: queryDatabases,
  params: {
    name: ''
  },
  columns: () => [
    {
      type: 'selection',
      width: 50,
      fixed: 'left'
    },
    {
      title: '名称',
      key: 'name',
      width: 150,
      align: 'center',
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
      width: 320,
      fixed: 'right',
      align: 'center',
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
          <ShareButton databaseId={rowData.id} />
          <RemoveButton
            action={() => removeDatabase([rowData.id])}
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
      removeDatabase(checkedRowKeys.value).then(res => {
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
