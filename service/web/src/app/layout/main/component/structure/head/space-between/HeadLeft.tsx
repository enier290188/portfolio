import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const HeadLeft = ({ children }: { children: appType.ChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: { xs: 'row', md: 'row' },
            flexWrap: { xs: 'wrap', md: 'wrap' },
            alignContent: { xs: 'flex-start', md: 'flex-start' },
            justifyContent: { xs: 'flex-start', md: 'flex-start' },
            alignItems: { xs: 'flex-start', md: 'flex-start' },
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
