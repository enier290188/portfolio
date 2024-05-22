import { appType } from '@./app'

export type TypeWrapperUser = appType.TypeSettingUser
export type TypeWrapperUserModel = appType.TypeSettingUserModel

export type TypeContext = {
    removeUser: () => void
    getUser: () => TypeWrapperUser
    updateUser: (user: TypeWrapperUser) => void
    login: (userModel: TypeWrapperUserModel) => void
    syncUp: (userModel: TypeWrapperUserModel) => void
}
