import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const Dashboard = React.lazy(() => import('./dashboard'))
const Deal = React.lazy(() => import('./deal'))

export const Project = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.project.dashboard).getTo()} />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.project.dashboard).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Dashboard />
                        </React.Suspense>
                    }
                />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.project.deal).getPath()}*`}
                    element={
                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                            <Deal />
                        </React.Suspense>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
