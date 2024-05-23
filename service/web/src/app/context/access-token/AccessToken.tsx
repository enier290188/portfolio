import { appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperAccessToken } from './AccessToken.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-access-token'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperAccessToken = ''

export const Context = React.createContext<TypeContext>({
    getAccessToken: () => LOCAL_STORAGE_VALUE_DEFAULT,
    updateAccessToken: () => null,
    removeAccessToken: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    if (!(typeof localStorageValue === 'string')) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [accessToken, setAccessToken] = React.useState<TypeWrapperAccessToken>(localStorageValue)

    const getAccessToken = React.useCallback((): TypeWrapperAccessToken => {
        return accessToken
    }, [accessToken])

    const updateAccessToken = React.useCallback((accessToken: TypeWrapperAccessToken): void => {
        setAccessToken(() => accessToken)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accessToken))
    }, [])

    const removeAccessToken = React.useCallback((): void => {
        setAccessToken(() => LOCAL_STORAGE_VALUE_DEFAULT)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
    }, [])

    return (
        <Context.Provider
            value={{
                getAccessToken: getAccessToken,
                updateAccessToken: updateAccessToken,
                removeAccessToken: removeAccessToken,
            }}
        >
            {children}
        </Context.Provider>
    )
}
