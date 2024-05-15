import { app, appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperLanguage } from './I18n.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-i18n'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperLanguage = 'en'

export const Context = React.createContext<TypeContext>({
    getLanguage: () => LOCAL_STORAGE_VALUE_DEFAULT,
    updateLanguage: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    if (!(typeof localStorageValue === 'string' && Array<string>(...app.setting.i18n.value.I18N_LIST).includes(localStorageValue))) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [language, setLanguage] = React.useState<TypeWrapperLanguage>(localStorageValue)

    const getLanguage = React.useCallback((): TypeWrapperLanguage => {
        return language
    }, [language])

    const updateLanguage = React.useCallback((language: TypeWrapperLanguage): void => {
        setLanguage(language)
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(language))
    }, [])

    return (
        <Context.Provider
            value={{
                getLanguage: getLanguage,
                updateLanguage: updateLanguage,
            }}
        >
            {children}
        </Context.Provider>
    )
}
