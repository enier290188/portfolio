import { app, appType } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import React from 'react'
import { component } from '../../component'

export const Workspace = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()

    const navigate = router.hook.useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenuOnOpen = React.useCallback((e: appType.MouseEvent<HTMLElement>) => {
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
            <component.item.menu.MenuButton disabled={user.groupList.length <= 1} onClick={handleMenuOnOpen}>
                <mui.icon.ViewCarousel />
                {i18n.getText(`workspace.group.${user.workspace.toLowerCase()}`).toUpperCase()}
            </component.item.menu.MenuButton>
            <component.item.menu.MenuContent anchorEl={anchorEl} onClick={handleMenuOnClose}>
                {user.groupList.map((group) => {
                    const groupStringLowerCase = String(group).toLowerCase()
                    return (
                        <component.item.menu.MenuContentItemButton
                            key={`${group}`}
                            match={group === user.workspace}
                            onClick={() => {
                                contextAlert.addAlert({ type: 'success', message: i18n.getText('workspace.alert.success', { group: i18n.getText(`workspace.group.${groupStringLowerCase}`) }), duration: 1000 })
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                navigate(app.setting.route.getNode(app.setting.route.app.workspace[groupStringLowerCase]).getTo())
                            }}
                        >
                            <mui.icon.Widgets />
                            {i18n.getText(`workspace.group.${groupStringLowerCase}`)}
                        </component.item.menu.MenuContentItemButton>
                    )
                })}
            </component.item.menu.MenuContent>
        </component.item.menu.Menu>
    )
}
