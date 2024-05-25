import { appType } from '@./app'
import React from 'react'
import { TypeContext, TypeWrapperAlert } from './Alert.type.ts'

const LOCAL_STORAGE_KEY = 'app-context-alert'
const LOCAL_STORAGE_VALUE_DEFAULT: TypeWrapperAlert[] = []

export const Context = React.createContext<TypeContext>({
    getAlertList: () => LOCAL_STORAGE_VALUE_DEFAULT,
    addAlert: () => null,
    deleteAlert: () => null,
})

export const Wrapper = ({ children }: { children: appType.TypeChildrenProps }) => {
    let localStorageValue = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
    if (!(typeof localStorageValue === 'object' && Object.hasOwn(localStorageValue, 'length'))) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_VALUE_DEFAULT))
        localStorageValue = LOCAL_STORAGE_VALUE_DEFAULT
    }
    const [alertList, setAlertList] = React.useState<TypeWrapperAlert[]>(localStorageValue)

    const getAlertList = React.useCallback((): TypeWrapperAlert[] => {
        return alertList
    }, [alertList])

    const addAlert = React.useCallback((alert: Omit<TypeWrapperAlert, 'id'>): void => {
        setAlertList((oldAlertList) => {
            let id: TypeWrapperAlert['id'] = Date.now()
            if (0 < oldAlertList.length) {
                let isIdValid = false
                while (!isIdValid) {
                    for (const oldAlert of oldAlertList) {
                        if (oldAlert.id === id) {
                            isIdValid = false
                            id = Date.now()
                            break
                        } else {
                            isIdValid = true
                        }
                    }
                }
            }
            const duration = alert.duration ?? 10000
            const newAlert: TypeWrapperAlert = { id: id, ...alert, duration: duration }
            const newAlertList: TypeWrapperAlert[] = [newAlert, ...oldAlertList]
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAlertList))
            return newAlertList
        })
    }, [])

    const deleteAlert = React.useCallback((id: TypeWrapperAlert['id']): void => {
        setAlertList((oldAlertList) => {
            const newAlertList: TypeWrapperAlert[] = [...oldAlertList].filter((alertFilter) => alertFilter.id !== id)
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAlertList))
            return newAlertList
        })
    }, [])

    return (
        <Context.Provider
            value={{
                getAlertList: getAlertList,
                addAlert: addAlert,
                deleteAlert: deleteAlert,
            }}
        >
            {children}
        </Context.Provider>
    )
}
