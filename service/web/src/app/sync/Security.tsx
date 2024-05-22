import { app, appType } from '@./app'
import React from 'react'

export const Security = ({ children }: { children?: appType.TypeChildrenProps }) => {
    const interval = app.hook.useInterval()
    const intervalActionStart = interval.start
    const intervalActionStop = interval.stop

    const contextOnlineStatus = React.useContext(app.context.onlineStatus.Context)
    const onlineStatus = contextOnlineStatus.getOnlineStatus()

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getAccessToken()
    const accessTokenActionRemoveAccessToken = contextAccessToken.removeAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userActionRemoveUser = contextUser.removeUser
    const userActionSyncUp = contextUser.syncUp

    const syncUp = React.useCallback(async () => {
        if (interval?.date && onlineStatus && accessToken && user?.id) {
            const response = await app.service.account.index(accessToken)
            if (response.status === 200) {
                userActionSyncUp(response.data.auth.user)
                intervalActionStart(60000)
            } else {
                accessTokenActionRemoveAccessToken()
                userActionRemoveUser()
                intervalActionStop()
            }
        } else {
            intervalActionStop()
        }
    }, [interval?.date, intervalActionStart, intervalActionStop, onlineStatus, accessToken, accessTokenActionRemoveAccessToken, user?.id, userActionRemoveUser, userActionSyncUp])

    React.useLayoutEffect(() => {
        syncUp()
            .then(() => null)
            .catch(() => null)
        return () => intervalActionStop() // Cleanup
    }, [intervalActionStop, syncUp])

    return <>{children}</>
}
