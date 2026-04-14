import type { UserInfo } from '@/api/user'
import config from '@/config'
import { storage } from '@/utils/storage'
import { acceptHMRUpdate, defineStore } from 'pinia'
const createDefault = (): UserInfo => ({
  realName: '',
  token: '',
  ifLocked: false,
  lockedTime: 0,
  ifAutoLogOff: false,
  autoLogOffTime: 0
})
export interface IUserState {
  passwordExpired: boolean
  info: UserInfo
}
export const useUserStore = defineStore('userStore', {
  state: (): IUserState => {
    const info = storage.get<UserInfo>(config.userInfoKeyName) || createDefault()
    return {
      passwordExpired: false,
      info
    }
  },
  getters: {
    realName: state => {
      return state.info.realName
    },
    token: state => {
      return state.info.token
    }
  },
  actions: {
    updateInfo(info: UserInfo) {
      Object.assign(this.info, info)
      storage.set(config.userInfoKeyName, info, null)
    },
    reset() {
      this.passwordExpired = false
      this.info = createDefault()
      storage.remove(config.userInfoKeyName)
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
