import { app, appType } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'
import { component } from '../../component'

export const Translate = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

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
                <mui.icon.Language />
                {contextI18nLanguage.toUpperCase()}
            </component.item.menu.MenuButton>
            <component.item.menu.MenuContent anchorEl={anchorEl} onClick={handleMenuOnClose}>
                {app.setting.value.I18N_LANGUAGE_LIST.map((language) => (
                    <component.item.menu.MenuContentItemButton
                        key={language}
                        match={contextI18nLanguage === language}
                        onClick={() => {
                            contextI18n.updateLanguage(language)
                            contextAlert.addAlert({ type: 'success', message: i18n.getText(`translate.alert.success.${language}`), duration: 1000 })
                        }}
                    >
                        <mui.icon.Language />
                        {i18n.getText(`translate.language.${language}`)}
                    </component.item.menu.MenuContentItemButton>
                ))}
            </component.item.menu.MenuContent>
        </component.item.menu.Menu>
    )
}
