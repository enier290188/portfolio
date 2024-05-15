import { app } from '@./app'

const ONLINE_STATUS_LIST: readonly [true, false] = app.setting.value.ONLINE_STATUS_LIST
export type ContextOnlineStatus = (typeof ONLINE_STATUS_LIST)[number]

const USER_GROUP_LIST: readonly ['Admin', 'Sale', 'Project'] = app.setting.value.USER_GROUP_LIST
export type ContextUser = null | {
    id: string
    name: string
    email: string
    phone: string
    picture: string
    groupList: (typeof USER_GROUP_LIST)[number][]
    workspace: (typeof USER_GROUP_LIST)[number]
}
