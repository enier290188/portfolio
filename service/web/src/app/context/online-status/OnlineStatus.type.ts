import { appType } from '@./app'

export type TypeWrapperOnlineStatus = appType.TypeSettingOnlineStatus

export type TypeContext = {
    getOnlineStatus: () => TypeWrapperOnlineStatus
}
