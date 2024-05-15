import { ReactNode } from 'react'
import { TypeAlert as TypeSettingAlert } from '../setting/alert/alert.type.ts'
import { TypeI18n as TypeSettingI18n } from '../setting/i18n/i18n.type.ts'
import { TypeOnlineStatus as TypeSettingOnlineStatus } from '../setting/online/online.type.ts'
import { TypeRoute as TypeSettingRoute } from '../setting/route/route.type.ts'
import { TypeThemeComponentSpace as TypeSettingThemeComponentSpace } from '../setting/theme/theme.type.ts'
import { TypeUser as TypeSettingUser } from '../setting/user/user.type.ts'

export type TypeFunctionComponent = ReactNode

export type TypeChildrenProps = TypeFunctionComponent | TypeFunctionComponent[]

export type { TypeSettingAlert }
export type { TypeSettingI18n }
export type { TypeSettingOnlineStatus }
export type { TypeSettingRoute }
export type { TypeSettingThemeComponentSpace }
export type { TypeSettingUser }
