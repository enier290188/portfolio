import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const DesktopContentLeft = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: theme.spacing(0),
            padding: theme.spacing(0.5),
        }),
        [],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
