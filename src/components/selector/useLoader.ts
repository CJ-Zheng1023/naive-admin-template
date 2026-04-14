import { queryRolesForSelect } from '@/api/role'
import { queryUsersForSelect } from '@/api/user'
export type LoaderType = 'role' | 'user' | 'database'
export default function (loader: LoaderType) {
  if (loader === 'role') {
    return queryRolesForSelect().then(res => res.data)
  } else if (loader === 'user') {
    return queryUsersForSelect().then(res => res.data)
  } else if (loader === 'database') {
    return Promise.resolve([])
  } else {
    //@ts-ignore
    const l: never = loader
    return Promise.resolve([])
  }
}
