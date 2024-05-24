import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import { queryDevtools } from '@./package/tanstack-react-query-devtools'
import React from 'react'

const Page = React.lazy(() => import('@./app/page/'))

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
                    <app.context.onlineStatus.Wrapper>
                        <app.context.alert.Wrapper>
                            <app.context.accessToken.Wrapper>
                                <app.context.user.Wrapper>
                                    <query.client.QueryClientProvider client={queryClient}>
                                        <app.layout.onlineStatus.OnlineStatus />
                                        <app.layout.alert.Alert />
                                        <app.sync.account.Account>
                                            <app.layout.header.Header />
                                            <app.layout.main.Main>
                                                <Page />
                                            </app.layout.main.Main>
                                            <app.layout.footer.Footer />
                                        </app.sync.account.Account>
                                        <queryDevtools.client.ReactQueryDevtools initialIsOpen={false} />
                                    </query.client.QueryClientProvider>
                                </app.context.user.Wrapper>
                            </app.context.accessToken.Wrapper>
                        </app.context.alert.Wrapper>
                    </app.context.onlineStatus.Wrapper>
                </app.context.i18n.Wrapper>
            </mui.style.ThemeProvider>
        </router.component.BrowserRouter>
    )
}
