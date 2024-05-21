import { app, appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperUser, TypeWrapperUserModel } from './User.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-user'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperUser = null

export const Context = React.createContext<TypeContext>({
    logout: () => null,
    getUser: () => LOCAL_STORAGE_VALUE_DEFAULT,
    updateUser: () => null,
    login: () => null,
    reset: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    const hasUserAttributesRequired = (): boolean => {
        if (localStorageValue?.id && typeof localStorageValue.id === 'string' && localStorageValue?.groupList && typeof localStorageValue.groupList === 'object' && Object.hasOwn(localStorageValue.groupList, 'length') && localStorageValue?.workspace && typeof localStorageValue.workspace === 'string') {
            for (const group of localStorageValue.groupList) {
                if (!app.setting.user.value.USER_GROUP_LIST.includes(group)) {
                    return false
                }
            }
            return localStorageValue.groupList.includes(localStorageValue.workspace)
        }
        return false
    }
    if (!(typeof localStorageValue === 'object' && hasUserAttributesRequired())) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [user, setUser] = React.useState<TypeWrapperUser>(localStorageValue)

    const logout = React.useCallback((): void => {
        setUser(LOCAL_STORAGE_VALUE_DEFAULT)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
    }, [])

    const getUser = React.useCallback((): TypeWrapperUser => {
        if (user?.id && user.groupList.includes(user.workspace)) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                picture: user.picture,
                groupList: user.groupList,
                workspace: user.workspace,
            }
        } else {
            return LOCAL_STORAGE_VALUE_DEFAULT
        }
    }, [user?.id, user?.name, user?.email, user?.phone, user?.picture, user?.groupList, user?.workspace])

    const updateUser = React.useCallback(
        (user: TypeWrapperUser): void => {
            if (user) {
                const userGroupList: NonNullable<TypeWrapperUser>['groupList'] = []
                if (user.groupList.includes('Root')) {
                    userGroupList.push('Root')
                }
                if (user.groupList.includes('Admin')) {
                    userGroupList.push('Admin')
                }
                if (user.groupList.includes('Sale')) {
                    userGroupList.push('Sale')
                }
                if (user.groupList.includes('Project')) {
                    userGroupList.push('Project')
                }
                if (userGroupList.includes(user.workspace)) {
                    const userUpdated: TypeWrapperUser = { ...user, groupList: userGroupList }
                    setUser(userUpdated)
                    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userUpdated))
                } else {
                    logout()
                }
            } else {
                logout()
            }
        },
        [logout],
    )

    const login = React.useCallback(
        (user: Omit<NonNullable<TypeWrapperUser>, 'workspace'>): void => {
            if (user && user?.id && 0 < user.groupList.length) {
                const workspace: null | NonNullable<TypeWrapperUser>['workspace'] = user.groupList.includes('Root') ? 'Root' : user.groupList.includes('Admin') ? 'Admin' : user.groupList.includes('Sale') ? 'Sale' : user.groupList.includes('Project') ? 'Project' : null
                if (workspace) {
                    updateUser({ ...user, workspace: workspace })
                } else {
                    logout()
                }
            } else {
                logout()
            }
        },
        [updateUser, logout],
    )

    const reset = React.useCallback(
        (user: TypeWrapperUser): void => {
            if (user) {
                const userGroupList: NonNullable<TypeWrapperUser>['groupList'] = []
                if (user.groupList.includes('Root')) {
                    userGroupList.push('Root')
                }
                if (user.groupList.includes('Admin')) {
                    userGroupList.push('Admin')
                }
                if (user.groupList.includes('Sale')) {
                    userGroupList.push('Sale')
                }
                if (user.groupList.includes('Project')) {
                    userGroupList.push('Project')
                }
                if (userGroupList.includes(user.workspace)) {
                    const userUpdated: TypeWrapperUser = { ...user, groupList: userGroupList }
                    setUser(userUpdated)
                    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userUpdated))
                } else {
                    logout()
                }
            } else {
                logout()
            }
        },
        [logout],
    )

    return (
        <Context.Provider
            value={{
                logout: logout,
                getUser: getUser,
                updateUser: updateUser,
                login: login,
                reset: reset,
            }}
        >
            {children}
        </Context.Provider>
    )
}
