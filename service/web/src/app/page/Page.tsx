import { app } from '@./app'
import { error } from '@./package/react-error-boundary'
import { router } from '@./package/react-router'
import React from 'react'

const Account = React.lazy(() => import('./account'))
const Workspace = React.lazy(() => import('./workspace'))
const Error = React.lazy(() => import('./error'))

export const Page = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={''}>
                <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app).getTo()} />} />
                <router.component.Route path={app.setting.route.getNode(app.setting.route.app).getPath()}>
                    <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.page).getTo()} />} />
                    <router.component.Route path={app.setting.route.getNode(app.setting.route.app.page).getPath()}>
                        <router.component.Route index element={<app.component.navigate.ToAppWorkspace />} />
                        <router.component.Route
                            path={`${app.setting.route.getNode(app.setting.route.app.page.account).getPath()}*`}
                            element={
                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                    <error.component.ErrorBoundary FallbackComponent={() => <app.component.navigate.ToAppErrorBoundary />}>
                                        <Account />
                                    </error.component.ErrorBoundary>
                                </React.Suspense>
                            }
                        />
                        <router.component.Route
                            path={`${app.setting.route.getNode(app.setting.route.app.page.workspace).getPath()}*`}
                            element={
                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                    <error.component.ErrorBoundary FallbackComponent={() => <app.component.navigate.ToAppErrorBoundary />}>
                                        <Workspace />
                                    </error.component.ErrorBoundary>
                                </React.Suspense>
                            }
                        />
                        <router.component.Route
                            path={`${app.setting.route.getNode(app.setting.route.app.page.error).getPath()}*`}
                            element={
                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                    <Error />
                                </React.Suspense>
                            }
                        />
                        <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
                    </router.component.Route>
                </router.component.Route>
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
