import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const Lead = React.lazy(() => import('./lead'))
const Deal = React.lazy(() => import('./deal'))
const Setting = React.lazy(() => import('./setting'))

export const Admin = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.page.workspace.admin.dashboard).getTo()} />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.dashboard).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Dashboard />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Lead />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.deal).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Deal />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.setting).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Setting />
                        </React.Suspense>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
