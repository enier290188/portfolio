import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Body = ({ children, alignItems = 'stretch' }: { children: appType.ChildrenProps; alignItems?: 'stretch' | 'center' }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: alignItems,
            margin: theme.spacing(0),
            padding: theme.spacing(0)
        }),
        [alignItems]
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
