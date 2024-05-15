import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const DesktopContentRight = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: theme.spacing(1.5, 0, 0, 'auto'),
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
