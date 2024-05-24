import { app } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const WorkspaceRoot = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, i18nLanguage), [i18nLanguage])

    return (
        <>
            <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.dashboard).getTo()}>
                <mui.icon.Dashboard />
                {i18n.getText('workspace-admin.dashboard')}
            </component.item.link.Link>
        </>
    )
}
