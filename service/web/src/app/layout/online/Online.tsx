import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Online = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.online, contextI18nLanguage), [contextI18nLanguage])
    const contextOnline = React.useContext(app.context.online.Context)
    const status = contextOnline.getStatus()

    const sxOnline = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            zIndex: theme.zIndex.drawer + 4
        }),
        []
    )
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            position: 'absolute',
            margin: {
                xs: theme.spacing(2, 2, 0, 2),
                md: theme.spacing(4, 0, 0, 0)
            },
            padding: theme.spacing(0)
        }),
        []
    )

    return !status ? (
        <mui.component.Box component={'section'} sx={sxOnline}>
            <mui.component.Box component={'div'} sx={sxContent}>
                <app.component.loading.Backdrop />
                <mui.component.Alert variant={'filled'} severity={'error'}>
                    {i18n.getText('alert.error.offline')}
                </mui.component.Alert>
            </mui.component.Box>
        </mui.component.Box>
    ) : null
}
