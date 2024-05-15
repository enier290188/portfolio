import { app } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const Login = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, contextI18nLanguage), [contextI18nLanguage])

    return (
        <component.item.link.Link to={app.setting.route.getNode(app.setting.route.app.account.login).getTo()}>
            <mui.icon.Login />
            {i18n.getText('login')}
        </component.item.link.Link>
    )
}
