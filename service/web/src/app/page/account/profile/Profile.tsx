import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import React from 'react'

const Info = React.lazy(() => import('./info'))
const Password = React.lazy(() => import('./password'))
const Picture = React.lazy(() => import('./picture'))

const Layout = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.profile, contextI18nLanguage), [contextI18nLanguage])

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'575px'}>
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.AccountCircle />
                    {i18n.getText('title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.spaceBetween.Body>
                <app.layout.main.component.structure.body.spaceBetween.BodyLeft>
                    <app.layout.main.component.structure.box.list.List>
                        <app.layout.main.component.structure.box.list.ListItemButtonLink to={app.setting.route.getNode(app.setting.route.app.account.profile.info).getTo()}>
                            <mui.icon.ManageAccounts />
                            {i18n.getText('list.info.title')}
                        </app.layout.main.component.structure.box.list.ListItemButtonLink>
                        <app.layout.main.component.structure.box.list.ListItemButtonLink to={app.setting.route.getNode(app.setting.route.app.account.profile.password).getTo()}>
                            <mui.icon.Password />
                            {i18n.getText('list.password.title')}
                        </app.layout.main.component.structure.box.list.ListItemButtonLink>
                        <app.layout.main.component.structure.box.list.ListItemButtonLink to={app.setting.route.getNode(app.setting.route.app.account.profile.picture).getTo()}>
                            <mui.icon.Crop />
                            {i18n.getText('list.picture.title')}
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

export const Profile = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``} element={<Layout />}>
                <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.account.profile.info).getTo()} />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.account.profile.info).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense justifyContent={'flex-start'} />}>
                            <Info />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.account.profile.password).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense justifyContent={'flex-start'} />}>
                            <Password />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.account.profile.picture).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense justifyContent={'flex-start'} />}>
                            <Picture />
                        </React.Suspense>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
