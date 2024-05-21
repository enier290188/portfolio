import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { error } from '@./package/react-error-boundary'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import { queryDevtools } from '@./package/tanstack-react-query-devtools'
import React from 'react'

const Account = React.lazy(() => import('@./app/page/account'))
const Workspace = React.lazy(() => import('@./app/page/workspace'))
const Error = React.lazy(() => import('@./app/page/error'))

const queryClient = new query.client.QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'online',
            refetchOnWindowFocus: false,
        },
    },
})

export default function App() {
    return (
        <router.component.BrowserRouter basename={'/'}>
            <mui.style.ThemeProvider theme={app.setting.theme}>
                <mui.component.CssBaseline />
                <app.context.i18n.Wrapper>
                    <app.context.online.Wrapper>
                        <app.context.alert.Wrapper>
                            <app.context.accessToken.Wrapper>
                                <app.context.user.Wrapper>
                                    <query.client.QueryClientProvider client={queryClient}>
                                        <app.layout.online.Online />
                                        <app.layout.alert.Alert />
                                        <app.layout.header.Header />
                                        <app.layout.main.Main>
                                            <router.component.Routes>
                                                <router.component.Route path={''}>
                                                    <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app).getTo()} />} />
                                                    <router.component.Route path={app.setting.route.getNode(app.setting.route.app).getPath()}>
                                                        <router.component.Route index element={<app.component.navigate.ToAppWorkspace />} />
                                                        <router.component.Route
                                                            path={`${app.setting.route.getNode(app.setting.route.app.account).getPath()}*`}
                                                            element={
                                                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                                                    <error.component.ErrorBoundary FallbackComponent={() => <app.component.navigate.ToAppErrorBoundary />}>
                                                                        <Account />
                                                                    </error.component.ErrorBoundary>
                                                                </React.Suspense>
                                                            }
                                                        />
                                                        <router.component.Route
                                                            path={`${app.setting.route.getNode(app.setting.route.app.workspace).getPath()}*`}
                                                            element={
                                                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                                                    <error.component.ErrorBoundary FallbackComponent={() => <app.component.navigate.ToAppErrorBoundary />}>
                                                                        <Workspace />
                                                                    </error.component.ErrorBoundary>
                                                                </React.Suspense>
                                                            }
                                                        />
                                                        <router.component.Route
                                                            path={`${app.setting.route.getNode(app.setting.route.app.error).getPath()}*`}
                                                            element={
                                                                <React.Suspense fallback={<app.component.loading.Suspense />}>
                                                                    <Error />
                                                                </React.Suspense>
                                                            }
                                                        />
                                                        <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
                                                    </router.component.Route>
                                                    <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
                                                </router.component.Route>
                                            </router.component.Routes>
                                        </app.layout.main.Main>
                                        <app.layout.footer.Footer />
                                        <queryDevtools.client.ReactQueryDevtools initialIsOpen={false} />
                                    </query.client.QueryClientProvider>
                                </app.context.user.Wrapper>
                            </app.context.accessToken.Wrapper>
                        </app.context.alert.Wrapper>
                    </app.context.online.Wrapper>
                </app.context.i18n.Wrapper>
            </mui.style.ThemeProvider>
        </router.component.BrowserRouter>
    )
}
