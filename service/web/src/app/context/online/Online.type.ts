import { appType } from '@./app'

export type TypeWrapperStatus = appType.TypeSettingOnlineStatus

export type TypeContext = {
    getStatus: () => TypeWrapperStatus
}
