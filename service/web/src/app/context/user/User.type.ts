import { appType } from '@./app'

export type TypeWrapperUser = appType.TypeSettingUser
export type TypeWrapperUserModel = appType.TypeSettingUserModel

export type TypeContext = {
    logout: () => void
    getUser: () => TypeWrapperUser
    updateUser: (user: TypeWrapperUser) => void
    login: (user: TypeWrapperUserModel) => void
    reset: (user: TypeWrapperUserModel) => void
}
