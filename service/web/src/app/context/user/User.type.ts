import { appType } from '@./app'

export type TypeWrapperUser = appType.TypeSettingUser
export type TypeWrapperUserResponse = appType.TypeSettingUserResponse

export type TypeContext = {
    removeUser: () => void
    getUser: () => TypeWrapperUser
    updateUser: (user: TypeWrapperUser) => void
    loginUser: (userResponse: TypeWrapperUserResponse) => void
    syncUser: (userResponse: TypeWrapperUserResponse) => void
}
