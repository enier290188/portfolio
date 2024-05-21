import { appType } from '@./app'

export type TypeWrapperUser = appType.TypeSettingUser

export type TypeContext = {
    login: (user: Omit<NonNullable<TypeWrapperUser>, 'workspace'>) => void
    logout: () => void
    getUser: () => TypeWrapperUser
    updateUserWorkspace: (user: TypeWrapperUser) => void
    // updateUser: (user: TypeWrapperUser) => void
}
