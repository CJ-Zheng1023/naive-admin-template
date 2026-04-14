import { NButton, NSpace, type NotificationReactive } from 'naive-ui'
export default function () {
  let version = ''
  let n: NotificationReactive
  let timer: number | null = null
  // 获取最新版本号
  const _getVersion = () => {
    return fetch('/index.html')
      .then(res => res.text())
      .then(data => {
        const arr = data.match(/<script.+(\d+\.\d+\.\d+.*)\.js/)
        return arr ? arr[1] : ''
      })
  }
  // 比较版本号
  const _checkVersion = () => {
    _getVersion()
      .then(v => {
        if (version) {
          if (version !== v) {
            n = window.$notification.info({
              title: '更新提示',
              content: '页面有新版本更新，点击确定可更新页面。',
              meta: `版本号：V${v}`,
              duration: 10000,
              action: () =>
                h(NSpace, null, {
                  default: () => [
                    h(
                      NButton,
                      {
                        strong: true,
                        secondary: true,
                        size: 'small',
                        type: 'success',
                        onClick: () => {
                          window.location.reload()
                        }
                      },
                      {
                        default: () => '确定'
                      }
                    ),
                    h(
                      NButton,
                      {
                        strong: true,
                        secondary: true,
                        size: 'small',
                        onClick: () => {
                          n.destroy()
                        }
                      },
                      {
                        default: () => '关闭'
                      }
                    )
                  ]
                })
            })
          }
        } else {
          version = v
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        // 每半小时检查更新
        timer = setTimeout(_checkVersion, 1800000)
      })
  }
  if (import.meta.env.PROD) {
    onMounted(() => {
      _checkVersion()
    })
    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })
  }
}
