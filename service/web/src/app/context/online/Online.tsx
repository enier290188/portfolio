import { app, appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperStatus } from './Online.type.ts'

const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperStatus = true

export const Context = React.createContext<TypeContext>({
    getStatus: () => LOCAL_STORAGE_VALUE_DEFAULT
})

export const Wrapper = ({ children }: { children: appType.ChildrenProps }) => {
    const status = app.hook.useNavigatorOnline()

    const getStatus = React.useCallback((): TypeWrapperStatus => {
        return status
    }, [status])

    return (
        <Context.Provider
            value={{
                getStatus: getStatus
            }}
        >
            {children}
        </Context.Provider>
    )
}
