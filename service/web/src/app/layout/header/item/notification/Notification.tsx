import { app, appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const Notification = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, contextI18nLanguage), [contextI18nLanguage])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenuOnOpen = React.useCallback((e: appType.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const handleMenuOnClose = React.useCallback(() => {
        setAnchorEl(null)
    }, [])

    return (
        <component.item.menu.Menu>
            <component.item.menu.MenuButton onClick={handleMenuOnOpen}>
                <mui.icon.Notifications sx={{ margin: (theme: muiType.Theme) => `${theme.spacing(0.5, 1.25)} !important` }} />
            </component.item.menu.MenuButton>
            <component.item.menu.MenuContent anchorEl={anchorEl} onClick={handleMenuOnClose}>
                <component.item.menu.MenuContentItemButton>
                    <mui.icon.NotificationsNone />
                    {i18n.getText('notification.none')}
                </component.item.menu.MenuContentItemButton>
            </component.item.menu.MenuContent>
        </component.item.menu.Menu>
    )
}
