import { MouseEvent as TypeMouseEvent, ReactNode as TypeReactNode } from 'react'
import { TypeAccessToken as TypeSettingAccessToken } from '../setting/access-token/accessToken.type.ts'
import { TypeAlert as TypeSettingAlert } from '../setting/alert/alert.type.ts'
import { TypeI18nLanguage as TypeSettingI18nLanguage } from '../setting/i18n/i18n.type.ts'
import { TypeOnlineStatus as TypeSettingOnlineStatus } from '../setting/online-status/onlineStatus.type.ts'
import { TypeRouteStructure as TypeSettingRouteStructure } from '../setting/route/route.type.ts'
import { TypeThemeComponentSpace as TypeSettingThemeComponentSpace } from '../setting/theme/theme.type.ts'
import { TypeUser as TypeSettingUser } from '../setting/user/user.type.ts'

export type TypeFunctionComponent = TypeReactNode

export type TypeChildrenProps = TypeFunctionComponent | TypeFunctionComponent[]

export type { TypeMouseEvent }

export type TypeModel = {
    id: string
    created_at: string
    updated_at: string
}
export type TypeModelCompany = TypeModel & {
    name: string
    email: string
    phone: string
    logo: string
    is_active: boolean
}
export type TypeModelUser = TypeModel & {
    name: string
    email: string
    phone: string
    picture: string
    is_active: boolean
    has_permission_of_root: boolean
    has_permission_of_admin: boolean
    has_permission_of_sale: boolean
    has_permission_of_project: boolean
    company_id: null | string
}
export type TypeModelLead = TypeModel & {
    name: string
    email: string
    phone: string
    company_id: null | string
}
export type TypeModelDeal = TypeModel & {
    name: string
    email: string
    phone: string
    company_id: null | string
}

export type { TypeSettingAccessToken }
export type { TypeSettingAlert }
export type { TypeSettingI18nLanguage }
export type { TypeSettingOnlineStatus }
export type { TypeSettingRouteStructure }
export type { TypeSettingThemeComponentSpace }
export type { TypeSettingUser }
export type TypeSettingUserResponse = {
    id: TypeModelUser['id']
    name: TypeModelUser['name']
    email: TypeModelUser['email']
    phone: TypeModelUser['phone']
    picture: TypeModelUser['picture']
    has_permission_of_root: TypeModelUser['has_permission_of_root']
    has_permission_of_admin: TypeModelUser['has_permission_of_admin']
    has_permission_of_sale: TypeModelUser['has_permission_of_sale']
    has_permission_of_project: TypeModelUser['has_permission_of_project']
}

export type TypeServiceApiPageAccountProfileResponse = {
    id: TypeModelUser['id']
    name: TypeModelUser['name']
    email: TypeModelUser['email']
    phone: TypeModelUser['phone']
    picture: TypeModelUser['picture']
}

export type TypeServiceApiPageWorkspaceRootCompanyResponse = {
    id: TypeModelCompany['id']
    name: TypeModelCompany['name']
    email: TypeModelCompany['email']
    phone: TypeModelCompany['phone']
    logo: TypeModelCompany['logo']
    is_active: TypeModelCompany['is_active']
    created_at: TypeModelCompany['created_at']
    updated_at: TypeModelCompany['updated_at']
}
