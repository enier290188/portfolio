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

export type TypeUserResponse = {
    id: string
    name: string
    email: string
    phone: string
    picture: string
    has_permission_of_root: boolean
    has_permission_of_admin: boolean
    has_permission_of_sale: boolean
    has_permission_of_project: boolean
    company_id: null | string
}
