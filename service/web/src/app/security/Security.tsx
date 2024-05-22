import { app, appType } from '@./app'
import React from 'react'

export const Security = ({ children }: { children?: appType.TypeChildrenProps }) => {
    const interval = app.hook.useInterval()
    const intervalActionStart = interval.start
    const intervalActionStop = interval.stop

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getValue()
    const accessTokenActionUpdateValue = contextAccessToken.updateValue

    const authenticate = React.useCallback(async () => {
        console.log('')
        console.log('********** ********** ********** ********** **********')
        console.log('>>> authenticate')

        if (accessToken) {
            console.log(accessToken)

            const response = await app.service.account.index(accessToken)
            console.log(response)

            if (response.status === 200) {
                accessTokenActionUpdateValue(response.data.auth.access_token)
            }

            intervalActionStart(1000)
        } else {
            intervalActionStop()
        }
    }, [intervalActionStart, intervalActionStop, accessToken, accessTokenActionUpdateValue])

    React.useEffect(() => {
        authenticate()
            .then(() => null)
            .catch(() => null)
        return () => intervalActionStop() // Cleanup
    }, [intervalActionStop, authenticate])

    return <>{children}</>
}
