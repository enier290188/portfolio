import { app } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const WorkspaceAdmin = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, i18nLanguage), [i18nLanguage])

    return (
        <>
            <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.workspace.admin.dashboard).getTo()}>
                <mui.icon.Dashboard />
                {i18n.getText('workspace-admin.dashboard')}
            </component.item.link.Link>
            <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.workspace.admin.lead).getTo()}>
                <mui.icon.BusinessCenter />
                {i18n.getText('workspace-admin.lead')}
            </component.item.link.Link>
            <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.workspace.admin.deal).getTo()}>
                <mui.icon.Mediation />
                {i18n.getText('workspace-admin.deal')}
            </component.item.link.Link>
            <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.workspace.admin.setting).getTo()}>
                <mui.icon.Settings />
                {i18n.getText('workspace-admin.setting')}
            </component.item.link.Link>
        </>
    )
}
