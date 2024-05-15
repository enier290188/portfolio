import { appType } from '@./app'

export type TypeWrapperStatus = appType.ContextOnlineStatus

export type TypeContext = {
    getStatus: () => TypeWrapperStatus
}
