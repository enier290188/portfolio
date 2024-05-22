import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const Boundary = React.lazy(() => import('./boundary'))
const Forbidden = React.lazy(() => import('./forbidden'))
const NotFound = React.lazy(() => import('./not-found'))

const Layout = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.error, i18nLanguage), [i18nLanguage])

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'575px'}>
            <app.layout.main.component.structure.body.Body>
                <app.layout.main.component.structure.box.content.Content alignItems={'center'}>
                    <app.component.typography.Typography space={{ top: 1, right: 1, bottom: 0, left: 1 }} variant={'h1'} noWrap={false} typographyProps={{ textAlign: 'center' }}>
                        {i18n.getText('title')}
                    </app.component.typography.Typography>
                    <app.component.typography.Typography space={{ top: 0, right: 1, bottom: 1, left: 1 }} variant={'body1'} noWrap={false} typographyProps={{ textAlign: 'center' }}>
                        {i18n.getText('message')}
                    </app.component.typography.Typography>
                </app.layout.main.component.structure.box.content.Content>
                <app.component.divider.Divider />
                <app.layout.main.component.structure.box.content.Content alignItems={'center'}>
                    <router.component.Outlet />
                </app.layout.main.component.structure.box.content.Content>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Error = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``} element={<Layout />}>
                <router.component.Route index element={<app.component.navigate.ToAppErrorNotFound />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.error.boundary).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Boundary />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.error.forbidden).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Forbidden />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.error.notFound).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <NotFound />
                        </React.Suspense>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
