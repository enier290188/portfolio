import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const BodyRight = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            margin: theme.spacing(0),
            padding: theme.spacing(0),
            overflowX: 'auto',
        }),
        [],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
