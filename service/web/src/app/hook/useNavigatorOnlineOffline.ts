import React from 'react'

const getSnapshot = () => {
    return navigator.onLine
}

const subscribe = (callback: () => void) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)

    return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
    }
}

export const useNavigatorOnlineOffline = () => {
    return React.useSyncExternalStore(subscribe, getSnapshot)
}
