import { app, appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const UnderConstruction = ({ space = 0 }: { space?: appType.TypeSettingThemeComponentSpace }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.underConstruction, contextI18nLanguage), [contextI18nLanguage])

    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            <app.component.typography.Typography variant={'h1'} noWrap={false} space={0} typographyProps={{ textAlign: 'center' }}>
                <mui.icon.ImportantDevices />
            </app.component.typography.Typography>
            <app.component.typography.Typography variant={'h4'} noWrap={false} space={0} typographyProps={{ textAlign: 'center' }}>
                {i18n.getText('text1')}
            </app.component.typography.Typography>
            <app.component.typography.Typography variant={'h6'} noWrap={false} space={0} typographyProps={{ textAlign: 'center' }}>
                {i18n.getText('text2')}
            </app.component.typography.Typography>
        </mui.component.Box>
    )
}
