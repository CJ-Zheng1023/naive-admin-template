<template>
  <div class="container">
    <n-spin :show="loading" style="height: 100%;" :content-style="{ height: '100%' }">
      <Card bordered header-bordered full :body-style="{ padding: 0 }">
        <template #actions>
          <n-flex :size="[4, 0]">
            <Button type="primary" name="创建" icon="Add" @click="openFormModal(undefined, undefined, false)" />
            <Button type="error" name="批量删除" icon="TrashCan" :disabled="!checkedRowKeys.length" @click="batchRemove" :loading="btnLoading" />
          </n-flex>
        </template>
        <template #default>
          <n-data-table
            children-key="menuList"
            :columns
            :data
            style="height: 100%;"
            :row-key="rowKey"
            flex-height
            :remote="true"
            v-model:checked-row-keys="checkedRowKeys"
            :scroll-x="950"
            :bordered="false"
          />
        </template>
      </Card>
    </n-spin>
    <FormModal v-model:visible="formModalVisible" :id="curId" :parent-id :is-button @refresh="handleRefresh" />
  </div>
</template>

<script setup lang="tsx">
import Card from '@/components/card/index.vue'
import Button from '@/components/button/index.vue'
import { queryMenus, removeMenu, updateOrder, type MenuForList } from '@/api/menu'
import type { ID, NaiveUIType } from '@/types'
import { NFlex, type DataTableColumns } from 'naive-ui'
import FormModal from './formModal.vue'
import { MenuTypeEnum } from '@/enum'
import useLoading from '@/hooks/useLoading'
import RemoveButton from '@/components/removeButton/index.vue'
import ShowOrEditNumber from '@/components/showOrEditNumber/index.vue'
const checkedRowKeys = ref<ID[]>([])
const rowKey = (rowData: MenuForList) => rowData.id
const data = ref<MenuForList[]>([])
const { start, stop, loading } = useLoading()
const { start: startBtnLoading, stop: stopBtnLoading, loading: btnLoading } = useLoading()
const menuTypeMap: Record<MenuTypeEnum, { type: NaiveUIType, text: string }> = {
  [MenuTypeEnum.DIRECTORY]: {
    type: 'success',
    text: '目录'
  },
  [MenuTypeEnum.MENU]: {
    type: 'warning',
    text: '菜单'
  },
  [MenuTypeEnum.BUTTON]: {
    type: 'error',
    text: '按钮'
  }
}
const columns: DataTableColumns<MenuForList> = [
  {
    type: 'selection',
    align: 'center',
    width: 50
  },
  {
    title: '菜单名称',
    key: 'name',
    width: 150
  },
  {
    title: '地址',
    titleAlign: 'center',
    key: 'router',
    width: 150
  },
  {
    title: '前端组件/授权标识',
    titleAlign: 'center',
    width: 150,
    key: 'id',
    render: rowData => (
      rowData.type === MenuTypeEnum.BUTTON ? rowData.authorizationId : rowData.component
    )
  },
  {
    title: '序号',
    align: 'center',
    width: 100,
    key: 'orderNum',
    render: rowData => (
      <ShowOrEditNumber
        value={rowData.orderNum}
        {
          ...{
            'onUpdate:value': (value: number | null) => {
              updateOrder(rowData.id, value).then(res => {
                window.$message.success(res.msg)
                _loadData()
              })
            }
          }
        }
      />
    )
  },
  {
    title: '类型',
    key: 'type',
    align: 'center',
    width: 100,
    render: rowData => {
      const params = menuTypeMap[rowData.type]
      return <NTag bordered={true} type={params.type} size="small">{ params.text }</NTag>
    }
  },
  {
    title: '操作',
    key: 'operate',
    align: 'center',
    width: 250,
    render: rowData => (
      <NFlex justify="center" size={[8, 4]}>
        {
          rowData.type === MenuTypeEnum.DIRECTORY
            ? <Button
                name='添加子菜单'
                {
                  ...{
                    tertiary: true,
                    type: 'success',
                    onClick: () => {
                      openFormModal(rowData.id, undefined, false)
                    }
                  }
                }
              />
            : rowData.type === MenuTypeEnum.MENU
            ? <Button
                name='添加按钮'
                {
                  ...{
                    tertiary: true,
                    type: 'success',
                    onClick: () => {
                      openFormModal(rowData.id, undefined, true)
                    }
                  }
                }
              />
            : null
        }
        <Button
          name='修改'
          {
            ...{
              tertiary: true,
              type: 'primary',
              onClick: () => {
                openFormModal(undefined, rowData.id, rowData.type === MenuTypeEnum.BUTTON)
              }
            }
          }
        />
        <RemoveButton
        action={() => removeMenu([rowData.id])}
          {
          ...{
            onSuccess: _loadData
          }
          }
        />
      </NFlex>
    )
  }
]
const batchRemove = () => {
  window.$dialog.warning({
    title: '提示',
    content: '确定要删除选中数据吗？',
    positiveText: '确定',
    negativeText: '关闭',
    onPositiveClick: () => {
      startBtnLoading()
      removeMenu(checkedRowKeys.value).then(res => {
        window.$message.success(res.msg)
        _loadData()
      }).finally(stopBtnLoading)
    }
  })
}
const _loadData = () => {
  checkedRowKeys.value =[]
  start()
  queryMenus(MenuTypeEnum.BUTTON).then(res => {
    data.value = res.data
  }).finally(stop)
}
const formModalVisible = ref(false)
const curId = ref<ID>()
const parentId = ref<ID>()
const isButton = ref(false)
const openFormModal = (pid: ID | undefined, id: ID | undefined, flag: boolean) => {
  parentId.value = pid
  curId.value = id
  isButton.value = flag
  formModalVisible.value = true
}
onMounted(_loadData)
const handleRefresh = () => {
  _loadData()
}
</script>

<style scoped lang="less">

</style>