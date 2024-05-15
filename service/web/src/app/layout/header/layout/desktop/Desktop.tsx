import { appType } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'

export const Desktop = ({ children }: { children: appType.ChildrenProps }) => {
    const sxContent = React.useCallback(
        () => ({
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }),
        []
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
