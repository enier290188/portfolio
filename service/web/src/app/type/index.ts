import { MouseEvent as TypeMouseEvent, ReactNode as TypeReactNode } from 'react'
import { TypeAccessToken as TypeSettingAccessToken } from '../setting/access-token/accessToken.type.ts'
import { TypeAlert as TypeSettingAlert } from '../setting/alert/alert.type.ts'
import { TypeI18nLanguage as TypeSettingI18nLanguage } from '../setting/i18n/i18n.type.ts'
import { TypeOnlineStatus as TypeSettingOnlineStatus } from '../setting/online-status/onlineStatus.type.ts'
import { TypeRouteStructure as TypeSettingRouteStructure } from '../setting/route/route.type.ts'
import { TypeThemeComponentSpace as TypeSettingThemeComponentSpace } from '../setting/theme/theme.type.ts'
import { TypeUser as TypeSettingUser, TypeUserModel as TypeSettingUserModel } from '../setting/user/user.type.ts'

export type TypeFunctionComponent = TypeReactNode

export type TypeChildrenProps = TypeFunctionComponent | TypeFunctionComponent[]

export type { TypeMouseEvent }

export type { TypeSettingAccessToken }
export type { TypeSettingAlert }
export type { TypeSettingI18nLanguage }
export type { TypeSettingOnlineStatus }
export type { TypeSettingRouteStructure }
export type { TypeSettingThemeComponentSpace }
export type { TypeSettingUser }
export type { TypeSettingUserModel }

export type TypePageAccountProfileRequest = {
    accessToken: TypeSettingAccessToken
    id: TypeSettingUserModel['id']
}
export type TypePageAccountProfileResponse = {
    name: TypeSettingUserModel['name']
    email: TypeSettingUserModel['email']
    phone: TypeSettingUserModel['phone']
    picture: TypeSettingUserModel['picture']
}
export type TypePageAccountProfileInfoRequest = {
    id: TypeSettingUserModel['id']
    name: TypeSettingUserModel['name']
    email: TypeSettingUserModel['email']
    phone: TypeSettingUserModel['phone']
}
