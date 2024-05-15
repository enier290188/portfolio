import { appType } from '@./app'

export type TypeWrapperUser = appType.ContextUser

export type TypeContext = {
    login: (user: Omit<NonNullable<TypeWrapperUser>, 'workspace'>) => void
    logout: () => void
    getUser: () => TypeWrapperUser
    updateUser: (user: TypeWrapperUser) => void
}
