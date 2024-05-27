import { value } from './user.value.ts'

const USER_GROUP_LIST: readonly ['Root', 'Admin', 'Sale', 'Project'] = value.USER_GROUP_LIST
export type TypeUser = null | {
    id: string
    name: string
    email: string
    phone: string
    picture: string
    groupList: (typeof USER_GROUP_LIST)[number][]
    workspace: (typeof USER_GROUP_LIST)[number]
}
