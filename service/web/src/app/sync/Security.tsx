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
    const userId = user?.id ?? null
    const userActionRemoveUser = contextUser.removeUser
    const userActionSyncUser = contextUser.syncUser

    const intervalDateRef = React.useRef<null | number>(null)

    const sync = React.useCallback(async () => {
        if (interval.date && onlineStatus && accessToken && userId) {
            if (intervalDateRef.current === null || intervalDateRef.current !== interval.date) {
                const response = await app.service.account.sync(accessToken)
                if (response.status === 200) {
                    userActionSyncUser(response.data.auth.user)
                    intervalActionStart(60000)
                } else {
                    accessTokenActionRemoveAccessToken()
                    userActionRemoveUser()
                    intervalActionStop()
                }
            } else {
                intervalActionStart(1000)
            }
        } else {
            intervalActionStop()
        }
        intervalDateRef.current = interval.date
    }, [interval.date, intervalActionStart, intervalActionStop, onlineStatus, accessToken, accessTokenActionRemoveAccessToken, userId, userActionRemoveUser, userActionSyncUser])

    React.useLayoutEffect(() => {
        sync()
            .then(() => null)
            .catch(() => null)
        return () => intervalActionStop() // Cleanup
    }, [intervalActionStop, sync])

    return <>{children}</>
}
