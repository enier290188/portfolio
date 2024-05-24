import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const Login = React.lazy(() => import('./login'))
const Forgot = React.lazy(() => import('./forgot'))
const Profile = React.lazy(() => import('./profile'))
const Logout = React.lazy(() => import('./logout'))

export const Account = () => {
    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()

    const location = router.hook.useLocation()
    const [searchParams] = router.hook.useSearchParams()

    if (user) {
        const toAppAccountLogin = app.setting.route.getNode(app.setting.route.app.page.account.login).getTo()
        const toFrom = location?.pathname ?? toAppAccountLogin
        const searchParamUrlTo = searchParams.get('urlTo')
        if (toFrom === toAppAccountLogin && searchParamUrlTo) {
            return <app.component.navigate.To to={searchParamUrlTo} />
        }
    }

    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<app.component.navigate.ToAppErrorNotFound />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.account.login).getPath()}*`}
                    element={
                        user ? (
                            <app.component.navigate.ToAppWorkspace />
                        ) : (
                            <React.Suspense fallback={<app.component.loading.Suspense />}>
                                <Login />
                            </React.Suspense>
                        )
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.account.forgot).getPath()}*`}
                    element={
                        user ? (
                            <app.component.navigate.ToAppWorkspace />
                        ) : (
                            <React.Suspense fallback={<app.component.loading.Suspense />}>
                                <Forgot />
                            </React.Suspense>
                        )
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.account.profile).getPath()}*`}
                    element={
                        user ? (
                            <React.Suspense fallback={<app.component.loading.Suspense />}>
                                <Profile />
                            </React.Suspense>
                        ) : (
                            <app.component.navigate.ToAppAccountLogin />
                        )
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.account.logout).getPath()}*`}
                    element={
                        user ? (
                            <React.Suspense fallback={<app.component.loading.Suspense />}>
                                <Logout />
                            </React.Suspense>
                        ) : (
                            <app.component.navigate.ToAppAccountLogin />
                        )
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
