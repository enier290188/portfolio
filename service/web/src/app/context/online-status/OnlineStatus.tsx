import { app, appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperOnlineStatus } from './OnlineStatus.type.ts'

const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperOnlineStatus = true

export const Context = React.createContext<TypeContext>({
    getOnlineStatus: () => LOCAL_STORAGE_VALUE_DEFAULT,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    const onlineStatus = app.hook.useNavigatorOnlineOffline()

    const getOnlineStatus = React.useCallback((): TypeWrapperOnlineStatus => {
        return onlineStatus
    }, [onlineStatus])

    return (
        <Context.Provider
            value={{
                getOnlineStatus: getOnlineStatus,
            }}
        >
            {children}
        </Context.Provider>
    )
}
