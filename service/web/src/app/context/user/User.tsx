import { app, appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperUser, TypeWrapperUserModel } from './User.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-user'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperUser = null

export const Context = React.createContext<TypeContext>({
    removeUser: () => null,
    getUser: () => LOCAL_STORAGE_VALUE_DEFAULT,
    updateUser: () => null,
    login: () => null,
    syncUp: () => null,
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

    const removeUser = React.useCallback((): void => {
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
            if (user?.id && user.groupList.includes(user.workspace)) {
                setUser(user)
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
            } else {
                removeUser()
            }
        },
        [removeUser],
    )

    const login = React.useCallback(
        (userModel: TypeWrapperUserModel): void => {
            const groupList: NonNullable<TypeWrapperUser>['groupList'] = []
            if (userModel.has_permission_of_root) {
                groupList.push('Root')
            }
            if (userModel.has_permission_of_admin) {
                groupList.push('Admin')
            }
            if (userModel.has_permission_of_sale) {
                groupList.push('Sale')
            }
            if (userModel.has_permission_of_project) {
                groupList.push('Project')
            }
            const workspace: null | NonNullable<TypeWrapperUser>['workspace'] = groupList.includes('Root') ? 'Root' : groupList.includes('Admin') ? 'Admin' : groupList.includes('Sale') ? 'Sale' : groupList.includes('Project') ? 'Project' : null
            if (workspace) {
                updateUser({
                    id: userModel.id,
                    name: userModel.name,
                    email: userModel.email,
                    phone: userModel.phone,
                    picture: userModel.picture,
                    groupList: groupList,
                    workspace: workspace,
                })
            } else {
                removeUser()
            }
        },
        [removeUser, updateUser],
    )

    const syncUp = React.useCallback(
        (userModel: TypeWrapperUserModel): void => {
            const groupList: NonNullable<TypeWrapperUser>['groupList'] = []
            if (userModel.has_permission_of_root) {
                groupList.push('Root')
            }
            if (userModel.has_permission_of_admin) {
                groupList.push('Admin')
            }
            if (userModel.has_permission_of_sale) {
                groupList.push('Sale')
            }
            if (userModel.has_permission_of_project) {
                groupList.push('Project')
            }
            if (user?.workspace) {
                updateUser({
                    id: userModel.id,
                    name: userModel.name,
                    email: userModel.email,
                    phone: userModel.phone,
                    picture: userModel.picture,
                    groupList: groupList,
                    workspace: user.workspace,
                })
            } else {
                removeUser()
            }
        },
        [user?.workspace, removeUser, updateUser],
    )

    return (
        <Context.Provider
            value={{
                removeUser: removeUser,
                getUser: getUser,
                updateUser: updateUser,
                login: login,
                syncUp: syncUp,
            }}
        >
            {children}
        </Context.Provider>
    )
}
