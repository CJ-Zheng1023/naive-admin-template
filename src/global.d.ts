import { DialogProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui'
import { WindowProviderApi } from '@/provider/windowProvider/types'
declare global {
  interface Window {
    $message: MessageProviderInst
    $dialog: DialogProviderInst
    $notification: NotificationProviderInst
    $windows: WindowProxy[] | undefined
    $window: WindowProviderApi
    mark: WindowProxy | null
  }
}
