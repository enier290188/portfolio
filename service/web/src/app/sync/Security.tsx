import { app, appType } from '@./app'
import React from 'react'

export const Security = ({ children }: { children?: appType.TypeChildrenProps }) => {
    const interval = app.hook.useInterval()
    const intervalActionStart = interval.start
    const intervalActionStop = interval.stop

    const contextOnline = React.useContext(app.context.online.Context)
    const onlineStatus = contextOnline.getStatus()

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getValue()
    const accessTokenActionRemoveValue = contextAccessToken.removeValue

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userActionRemoveUser = contextUser.removeUser
    const userActionSyncUp = contextUser.syncUp

    const syncUp = React.useCallback(async () => {
        console.log('')
        console.log('********** ********** ********** ********** **********')
        console.log('>>> authenticate')
        console.log(interval?.date)

        if (interval?.date && onlineStatus && accessToken && user?.id) {
            console.log(accessToken)

            const response = await app.service.account.index(accessToken)
            console.log(response)

            if (response.status === 200) {
                userActionSyncUp(response.data.auth.user)
                intervalActionStart(60000)
            } else {
                accessTokenActionRemoveValue()
                userActionRemoveUser()
                intervalActionStop()
            }
        } else {
            intervalActionStop()
        }
    }, [interval?.date, intervalActionStart, intervalActionStop, onlineStatus, accessToken, accessTokenActionRemoveValue, user?.id, userActionRemoveUser, userActionSyncUp])

    React.useLayoutEffect(() => {
        syncUp()
            .then(() => null)
            .catch(() => null)
        return () => intervalActionStop() // Cleanup
    }, [intervalActionStop, syncUp])

    return <>{children}</>
}
