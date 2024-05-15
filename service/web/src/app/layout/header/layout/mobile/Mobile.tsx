import { appType } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'

export const Mobile = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        () => ({
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }),
        [],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
