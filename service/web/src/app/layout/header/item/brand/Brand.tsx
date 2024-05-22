import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Brand = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.layout.header, i18nLanguage), [i18nLanguage])

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: 0,
            margin: theme.spacing(0.5),
            padding: theme.spacing(0, 1, 0, 1),
            color: theme.palette.common.white,
            textDecoration: 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
        }),
        [],
    )

    return (
        <>
            <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app).getTo()} buttonProps={{ sx: sxContent }} typographyProps={{ variant: 'h4' }}>
                <mui.component.Avatar component={'span'} variant={'square'} src={app.asset.svg.Brand} sx={{ width: 36, height: 36 }} />
                {i18n.getText('brand')}
            </app.component.button.ButtonLink>
            <mui.component.Box component={'span'} mt={0} mr={'auto'} mb={0} ml={2} />
        </>
    )
}
