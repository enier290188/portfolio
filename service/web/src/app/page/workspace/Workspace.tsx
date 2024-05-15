import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const Admin = React.lazy(() => import('./admin'))
const Sale = React.lazy(() => import('./sale'))
const Project = React.lazy(() => import('./project'))

export const Workspace = () => {
    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userActionUpdate = contextUser.updateUser

    const location = router.hook.useLocation()

    React.useEffect(() => {
        if (user) {
            const toAppWorkspace = app.setting.route.getNode(app.setting.route.app.workspace).getTo()
            const toAppWorkspaceAdmin = app.setting.route.getNode(app.setting.route.app.workspace.admin).getTo()
            const toAppWorkspaceSale = app.setting.route.getNode(app.setting.route.app.workspace.sale).getTo()
            const toAppWorkspaceProject = app.setting.route.getNode(app.setting.route.app.workspace.project).getTo()

            const pathname = location?.pathname ?? toAppWorkspace

            if (pathname.includes(toAppWorkspaceAdmin) && pathname !== toAppWorkspaceAdmin && user.groupList.includes('Admin') && user.workspace !== 'Admin') {
                userActionUpdate({ ...user, workspace: 'Admin' })
            }
            if (pathname.includes(toAppWorkspaceSale) && pathname !== toAppWorkspaceSale && user.groupList.includes('Sale') && user.workspace !== 'Sale') {
                userActionUpdate({ ...user, workspace: 'Sale' })
            }
            if (pathname.includes(toAppWorkspaceProject) && pathname !== toAppWorkspaceProject && user.groupList.includes('Project') && user.workspace !== 'Project') {
                userActionUpdate({ ...user, workspace: 'Project' })
            }
        }
    }, [user, userActionUpdate, location])

    if (user) {
        if (user.groupList.includes('Admin') || user.groupList.includes('Sale') || user.groupList.includes('Project')) {
            return (
                <router.component.Routes>
                    <router.component.Route path={``}>
                        {user.groupList.includes('Admin') ? (
                            <>
                                {user.workspace === 'Admin' ? <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.admin).getTo()} />} /> : null}
                                <router.component.Route
                                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.admin).getPath()}*`}
                                    element={
                                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                                            <Admin />
                                        </React.Suspense>
                                    }
                                />
                            </>
                        ) : null}
                        {user.groupList.includes('Sale') ? (
                            <>
                                {user.workspace === 'Sale' ? <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.sale).getTo()} />} /> : null}
                                <router.component.Route
                                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.sale).getPath()}*`}
                                    element={
                                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                                            <Sale />
                                        </React.Suspense>
                                    }
                                />
                            </>
                        ) : null}
                        {user.groupList.includes('Project') ? (
                            <>
                                {user.workspace === 'Project' ? <router.component.Route index element={<app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.project).getTo()} />} /> : null}
                                <router.component.Route
                                    path={`${app.setting.route.getNode(app.setting.route.app.workspace.project).getPath()}*`}
                                    element={
                                        <React.Suspense fallback={<app.component.loading.Suspense />}>
                                            <Project />
                                        </React.Suspense>
                                    }
                                />
                            </>
                        ) : null}
                        <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
                    </router.component.Route>
                </router.component.Routes>
            )
        } else {
            return <app.component.navigate.ToAppErrorNotFound />
        }
    } else {
        return <app.component.navigate.ToAppAccountLogin />
    }
}
