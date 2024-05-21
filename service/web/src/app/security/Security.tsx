import { app, appType } from '@./app'
import React from 'react'

export const Security = ({ children }: { children?: appType.ChildrenProps }) => {
    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userActionUpdate = contextUser.updateUser
    const userActionLogout = contextUser.logout

    const interval = app.hook.useInterval()

    const authenticate = React.useCallback(async () => {
        if (user) {
            const amplifyAuthGetUserResult = await awsAmplifyAuth.getUser()
            if (!amplifyAuthGetUserResult.error) {
                if (amplifyAuthGetUserResult?.data) {
                    if (amplifyAuthGetUserResult.data?.userCognito) {
                        const userCognito = amplifyAuthGetUserResult.data.userCognito
                        const userCognitoGroupList: NonNullable<appType.ContextUser>['groupList'] = userCognito.groupList
                        if (0 < userCognitoGroupList.length) {
                            let isOkUserGroupList = true
                            if (userCognitoGroupList.length === user.groupList.length) {
                                for (const userGroup of user.groupList) {
                                    if (!userCognitoGroupList.includes(userGroup)) {
                                        isOkUserGroupList = false
                                        break
                                    }
                                }
                            } else {
                                isOkUserGroupList = false
                            }
                            if (!isOkUserGroupList) {
                                userActionUpdate({ ...user, groupList: userCognitoGroupList })
                            } else {
                                interval.start(60000)
                            }
                        } else {
                            userActionLogout()
                        }
                    }
                }
            } else {
                userActionLogout()
            }
        } else {
            interval.stop()
        }
    }, [user, userActionUpdate, userActionLogout, interval])

    React.useEffect(() => {
        authenticate()
            .then(() => null)
            .catch(() => null)
        return () => interval.stop() // Cleanup
    }, [interval, authenticate])

    return <>{children}</>
}
