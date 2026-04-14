import { useUserStore } from '@/store/user'
import type { MessageReactive } from 'naive-ui'

export default function () {
  let message: MessageReactive | null = null
  const _destroyMessage = () => {
    message?.destroy()
    message = null
  }
  const { passwordExpired } = storeToRefs(useUserStore())
  watch(
    passwordExpired,
    value => {
      if (value) {
        if (!message) {
          message = window.$message.warning('您的登录密码已过期，请及时修改。', {
            closable: true,
            duration: 0,
            onAfterLeave: () => {
              message = null
            }
          })
        }
      } else {
        _destroyMessage()
      }
    },
    {
      immediate: true
    }
  )
  onBeforeUnmount(() => {
    _destroyMessage()
  })
}
