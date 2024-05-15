import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Head = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: { xs: 'nowrap', md: 'nowrap' },
            alignContent: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            alignItems: { xs: 'stretch', md: 'stretch' },
            margin: theme.spacing(0),
            padding: theme.spacing(0),
        }),
        [],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            {children}
        </mui.component.Box>
    )
}
