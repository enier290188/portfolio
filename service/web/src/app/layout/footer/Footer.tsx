import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Footer = ({ maxWidth = 'lg' }: { maxWidth?: muiType.ContainerProps['maxWidth'] }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.footer, i18nLanguage), [i18nLanguage])

    const sxFooter = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(0),
            backgroundColor: theme.palette.secondary.main,
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
    const sxContentCenter = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',
        }),
        [],
    )

    const date = new Date()

    return (
        <mui.component.Box component={'footer'} sx={sxFooter}>
            <mui.component.Container component={'div'} maxWidth={maxWidth} disableGutters={true}>
                <mui.component.Box component={'div'} sx={sxContent}>
                    <mui.component.Box component={'div'} sx={sxContentCenter}>
                        <app.component.typography.Typography space={{ topBottom: 0, rightLeft: 2 }} variant={'caption'} noWrap={false}>
                            {i18n.getText('text', { year: date.getFullYear() })}
                        </app.component.typography.Typography>
                    </mui.component.Box>
                </mui.component.Box>
            </mui.component.Container>
        </mui.component.Box>
    )
}
