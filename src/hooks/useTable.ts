import type { ID, Pageable, ColumnConfigType } from '@/types'
import type { IResponse } from '@/types'
import type { DataTableColumns, PaginationInfo } from 'naive-ui'
import useLoading from '@/hooks/useLoading'
import type { DataTableBaseColumn } from 'naive-ui'

type Api<T> = (pageNo: number, pageSize: number, condition?: any) => Promise<IResponse<Pageable<T>>>
type TableConfig<T, F extends Api<T>> = {
  // 查询接口
  api: F
  // 查询条件
  params?: Parameters<F>[2]
  // 是否立即查询
  immediate?: boolean
  // 配置列工厂
  columns: (() => DataTableColumns<T>) | (() => Promise<DataTableColumns<T>>)
  // 查询数据前的操作
  beforeLoadData?: () => void
}
const SELECTION_KEY = 'key_selection'
const SELECTION_TYPE = 'selection'
const EXPAND_KEY = 'key_expand'
const EXPAND_TYPE = 'expand'
export default function useTable<T extends { id: ID }, F extends Api<T>>(config: TableConfig<T, F>) {
  const { start, stop, loading } = useLoading()
  const { api, params, immediate = true, columns, beforeLoadData } = config
  const pagination = reactive({
    pageSize: 20,
    page: 1,
    itemCount: 0,
    pageSlot: 7,
    pageSizes: [10, 20, 30, 40],
    showSizePicker: true,
    prefix: ({ itemCount }: PaginationInfo) => `共 ${itemCount} 项`,
    onUpdatePage: (page: number) => {
      pagination.page = page
      loadData(pagination.page)
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      loadData(1)
    }
  })
  const data: Ref<T[]> = ref([])
  const condition: NonNullable<Parameters<F>[2]> = reactive({ ...params })
  /**
   * 查询数据
   * @param page 页码
   */
  const loadData = (page: number = pagination.page) => {
    beforeLoadData && beforeLoadData()
    checkedRowKeys.value = []
    start()
    api(page, pagination.pageSize, condition)
      .then(res => {
        const { list, pagination: p } = res.data
        pagination.page = p.pageNo
        pagination.pageSize = p.pageSize
        pagination.itemCount = p.total
        data.value = list
      })
      .finally(stop)
  }
  const loadColumns = () => {
    const result = columns()
    if (result instanceof Promise) {
      result.then(res => {
        cols.value = res
        columnConfigs.value = _buildColumnSettings(res)
      })
    } else {
      cols.value = result
      columnConfigs.value = _buildColumnSettings(result)
    }
  }
  onMounted(() => {
    if (immediate) {
      loadColumns()
      loadData(1)
    }
  })
  /**
   * 构建列选项
   * @param columns 列配置
   * @returns
   */
  const _buildColumnSettings = (columns: DataTableColumns<T>) => {
    const configs: ColumnConfigType[] = []
    columns.forEach(item => {
      if (item.type === SELECTION_TYPE) {
        const name = item.multiple === false ? '单选框' : '复选框'
        configs.push({
          key: SELECTION_KEY,
          name,
          checked: true
        })
      } else if (item.type === EXPAND_TYPE) {
        configs.push({
          key: EXPAND_KEY,
          name: '扩展项',
          checked: true
        })
      } else {
        item = item as DataTableBaseColumn
        configs.push({
          key: item.key as string,
          name: item.title as string,
          checked: true
        })
      }
    })
    return configs
  }
  const columnConfigs: Ref<ColumnConfigType[]> = ref([])
  const cols: Ref<DataTableColumns<T>> = ref([])
  const checkedRowKeys = ref<ID[]>([])
  // 可显示列
  const filteredColumns = computed(() => {
    return columnConfigs.value
      .filter(item => item.checked)
      .map(item => {
        if (item.key === SELECTION_KEY) {
          return cols.value.find(col => col.type === SELECTION_TYPE)!
        } else if (item.key === EXPAND_KEY) {
          return cols.value.find(col => col.type === EXPAND_TYPE)!
        } else {
          return cols.value.find(col => {
            col = col as DataTableBaseColumn
            return col.key === item.key
          })!
        }
      })
  })
  const tableWidth = computed(() => {
    return filteredColumns.value.reduce((sum, item) => {
      return (sum = sum + Number(item.width) || 0)
    }, 0)
  })
  // 重置查询条件
  const resetCondition = () => {
    Object.assign(condition, params)
  }
  return {
    loading,
    data,
    loadData,
    pagination,
    condition,
    columnConfigs,
    filteredColumns,
    rowKey: (row: T) => row.id,
    resetCondition,
    loadColumns,
    tableWidth,
    checkedRowKeys
  }
}
