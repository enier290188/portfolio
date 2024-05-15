import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import React from 'react'

const Application = React.lazy(() => import('./application'))
const User = React.lazy(() => import('./user'))

const Layout = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.admin.setting, contextI18nLanguage), [contextI18nLanguage])

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'lg'}>
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.Settings />
                    {i18n.getText('title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.spaceBetween.Body>
                <app.layout.main.component.structure.body.spaceBetween.BodyLeft>
                    <app.layout.main.component.structure.box.list.List>
                        <app.layout.main.component.structure.box.list.ListItemButtonLink to={app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.user).getTo()}>
                            <mui.icon.People />
                            {i18n.getText('list.user.title')}
                        </app.layout.main.component.structure.box.list.ListItemButtonLink>
                    </app.layout.main.component.structure.box.list.List>
                </app.layout.main.component.structure.body.spaceBetween.BodyLeft>
                <app.layout.main.component.structure.body.spaceBetween.BodyRight>
                    <router.component.Outlet />
                </app.layout.main.component.structure.body.spaceBetween.BodyRight>
            </app.layout.main.component.structure.body.spaceBetween.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Setting = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``} element={<Layout />}>
                <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.user).getTo()} />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.application).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense justifyContent={'flex-start'} />}>
                            <Application />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.user).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense justifyContent={'flex-start'} />}>
                            <User />
                        </React.Suspense>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
