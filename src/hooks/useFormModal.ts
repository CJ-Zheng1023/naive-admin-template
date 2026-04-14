import type { ID } from '@/types'
import type { IResponse } from '@/types'
import type { FormInst, FormItemRule } from 'naive-ui'
import { isNil, pick } from 'lodash-es'
import useLoading from '@/hooks/useLoading'
import type { TemplateRef } from 'vue'
type R = Record<string, unknown>
type Save<T> = (p: T) => Promise<IResponse<any>>

type FormModalConfig<U extends { id: ID }, F extends R, S extends { id?: ID }> = {
  // 主键ID
  id: Ref<ID | null | undefined>
  // 窗口是否打开
  visible: Ref<boolean>
  // 表单实例
  formRef: TemplateRef<FormInst>
  //新增接口
  addApi: Save<S>
  //更新接口
  updateApi: Save<S>
  //查询接口
  queryApi: (id: ID) => Promise<IResponse<U>>
  //创建表单默认值工厂
  createDefault: () => F
  //表单验证规则
  rules?: {
    [P in keyof F]?: FormItemRule | FormItemRule[]
  }
  afterQuery?: (() => Promise<void>) | (() => void)
  // 回显对象转换为表单对象
  convertForForm?: (u: U) => F
}
export function useFormModal<U extends { id: ID }, F extends R, S extends { id?: ID }>(config: FormModalConfig<U, F, S>) {
  const {
    id,
    visible,
    formRef,
    addApi,
    updateApi,
    queryApi,
    afterQuery,
    createDefault,
    rules,
    convertForForm = (u: U) => {
      return pick(u, Object.keys(form)) as F
    }
  } = config
  watch(visible, newValue => {
    //监控窗口打开状态
    if (newValue) {
      // 非创建模式时进行查询回显
      id.value && _query(id.value)
    } else {
      resetForm()
    }
  })
  /* // 增强表单验证规则，增加trim验证
  const _enhanceRule = (rule: FormItemRule) => {
    if (rule.type !== 'number' && rule.trigger === 'input') {
      rule.validator = (_, value: string) => {
        if (!value || value.trim() === '') {
          return false
        } else {
          return true
        }
      }
    }
  }
  if (rules) {
    Object.keys(rules).forEach(key => {
      const formItemRules = rules[key]
      if (formItemRules) {
        if (Array.isArray(formItemRules)) {
          formItemRules.forEach(rule => {
            _enhanceRule(rule)
          })
        } else {
          _enhanceRule(formItemRules)
        }
      }
    })
  } */
  let form = reactive(createDefault())
  const ifCreate = computed(() => isNil(id.value))
  const { loading, start, stop } = useLoading()
  // 查询回显内容
  const _query = (id: ID) => {
    start()
    queryApi(id)
      .then(({ data }) => {
        Object.assign(form, convertForForm(data))
        return afterQuery ? afterQuery() : null
      })
      .finally(stop)
  }
  const saveApi = computed(() => (ifCreate.value ? addApi : updateApi))
  const title = computed(() => (ifCreate.value ? '创建' : '修改'))
  /**
   * 重置表单
   * @param custom 保留字段
   */
  const resetForm = (custom?: Partial<F>) => {
    formRef.value?.restoreValidation()
    if (custom) {
      Object.assign(form, createDefault(), custom)
    } else {
      form = Object.assign(form, createDefault())
    }
  }
  const save = (data: S) => {
    return formRef.value
      ?.validate()
      .then(() => {
        start()
        return saveApi.value(data)
      })
      .finally(stop)
  }
  return {
    rules,
    save,
    form,
    title,
    loading,
    ifCreate,
    resetForm
  }
}
