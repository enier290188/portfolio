import { app, appType } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const User = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, contextI18nLanguage), [contextI18nLanguage])

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenuOnOpen = React.useCallback((e: appType.TypeMouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const handleMenuOnClose = React.useCallback(() => {
        setAnchorEl(null)
    }, [])

    if (!user) {
        return null
    }

    return (
        <component.item.menu.Menu>
            <component.item.menu.MenuButton toList={[app.setting.route.getNode(app.setting.route.app.account.profile).getTo(), app.setting.route.getNode(app.setting.route.app.account.logout).getTo()]} onClick={handleMenuOnOpen}>
                <mui.component.Avatar component={'span'} variant={'circular'} src={user.picture} sx={{ width: 24, height: 24 }}>
                    <mui.icon.AccountCircle sx={{ width: '100%', height: '100%' }} />
                </mui.component.Avatar>
                {user.name ? user.name : user.email ? user.email : ''}
            </component.item.menu.MenuButton>
            <component.item.menu.MenuContent anchorEl={anchorEl} onClick={handleMenuOnClose}>
                <component.item.menu.MenuContentItemButtonLink to={app.setting.route.getNode(app.setting.route.app.account.profile).getTo()}>
                    <mui.icon.AccountCircle />
                    {i18n.getText('user.profile')}
                </component.item.menu.MenuContentItemButtonLink>
                <component.item.menu.MenuContentItemButtonLink to={app.setting.route.getNode(app.setting.route.app.account.logout).getTo()}>
                    <mui.icon.Logout />
                    {i18n.getText('user.logout')}
                </component.item.menu.MenuContentItemButtonLink>
            </component.item.menu.MenuContent>
        </component.item.menu.Menu>
    )
}
