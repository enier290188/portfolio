import { appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapper } from './AccessToken.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-access-token'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapper = ''

export const Context = React.createContext<TypeContext>({
    get: () => LOCAL_STORAGE_VALUE_DEFAULT,
    update: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    if (!(typeof localStorageValue === 'string')) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [accessToken, setAccessToken] = React.useState<TypeWrapper>(localStorageValue)

    const get = React.useCallback((): TypeWrapper => {
        return accessToken
    }, [accessToken])

    const update = React.useCallback((accessToken: TypeWrapper): void => {
        setAccessToken(accessToken)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accessToken))
    }, [])

    return (
        <Context.Provider
            value={{
                get: get,
                update: update,
            }}
        >
            {children}
        </Context.Provider>
    )
}
