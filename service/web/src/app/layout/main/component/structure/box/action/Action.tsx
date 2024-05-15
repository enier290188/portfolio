import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Action = ({ children }: { children: appType.ChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            margin: theme.spacing(0),
            padding: theme.spacing(1)
        }),
        []
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
