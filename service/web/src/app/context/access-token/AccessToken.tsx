import { appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperValue } from './AccessToken.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-access-token'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperValue = ''

export const Context = React.createContext<TypeContext>({
    getValue: () => LOCAL_STORAGE_VALUE_DEFAULT,
    updateValue: () => null,
    removeValue: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    if (!(typeof localStorageValue === 'string')) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [value, setValue] = React.useState<TypeWrapperValue>(localStorageValue)

    const getValue = React.useCallback((): TypeWrapperValue => {
        return value
    }, [value])

    const updateValue = React.useCallback((value: TypeWrapperValue): void => {
        setValue(value)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
    }, [])

    const removeValue = React.useCallback((): void => {
        setValue(LOCAL_STORAGE_VALUE_DEFAULT)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
    }, [])

    return (
        <Context.Provider
            value={{
                getValue: getValue,
                updateValue: updateValue,
                removeValue: removeValue,
            }}
        >
            {children}
        </Context.Provider>
    )
}
