import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { item } from './item'
import { layout } from './layout'

export const Header = ({ maxWidth = 'lg' }: { maxWidth?: muiType.ContainerProps['maxWidth'] }) => {
    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()

    const sxHeader = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(0),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        }),
        [],
    )
    const sxContent = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }),
        [],
    )

    return (
        <mui.component.Box component={'header'} sx={sxHeader}>
            <mui.component.Container component={'div'} maxWidth={maxWidth} disableGutters={true}>
                <mui.component.Box component={'div'} sx={sxContent}>
                    <layout.desktop.Desktop>
                        <layout.desktop.DesktopContentLeft>
                            <item.brand.Brand />
                            {user ? (
                                <>
                                    {user.workspace === 'Admin' ? <item.workspaceAdmin.WorkspaceAdmin /> : null}
                                    {user.workspace === 'Sale' ? <item.workspaceSale.WorkspaceSale /> : null}
                                    {user.workspace === 'Project' ? <item.workspaceProject.WorkspaceProject /> : null}
                                </>
                            ) : (
                                <>
                                    <item.login.Login />
                                    <item.forgot.Forgot />
                                </>
                            )}
                        </layout.desktop.DesktopContentLeft>
                        <layout.desktop.DesktopContentRight>
                            {user ? (
                                <>
                                    {user.workspace === 'Admin' || user.workspace === 'Sale' || user.workspace === 'Project' ? <item.workspace.Workspace /> : null}
                                    <item.user.User />
                                    <item.notification.Notification />
                                </>
                            ) : null}
                            <item.translate.Translate />
                        </layout.desktop.DesktopContentRight>
                    </layout.desktop.Desktop>
                    <layout.mobile.Mobile>
                        <layout.mobile.MobileContentTop>
                            <item.brand.Brand />
                            {user ? (
                                <>
                                    {user.workspace === 'Admin' || user.workspace === 'Sale' || user.workspace === 'Project' ? <item.workspace.Workspace /> : null}
                                    <item.user.User />
                                    <item.notification.Notification />
                                </>
                            ) : null}
                            <item.translate.Translate />
                        </layout.mobile.MobileContentTop>
                        <layout.mobile.MobileContentBottom>
                            {user ? (
                                <>
                                    {user.workspace === 'Admin' ? <item.workspaceAdmin.WorkspaceAdmin /> : null}
                                    {user.workspace === 'Sale' ? <item.workspaceSale.WorkspaceSale /> : null}
                                    {user.workspace === 'Project' ? <item.workspaceProject.WorkspaceProject /> : null}
                                </>
                            ) : (
                                <>
                                    <item.login.Login />
                                    <item.forgot.Forgot />
                                </>
                            )}
                        </layout.mobile.MobileContentBottom>
                    </layout.mobile.Mobile>
                </mui.component.Box>
            </mui.component.Container>
        </mui.component.Box>
    )
}
