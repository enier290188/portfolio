import { app, appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const BodyLeft = ({ children }: { children: appType.TypeChildrenProps }) => {
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            margin: theme.spacing(0),
            padding: theme.spacing(0),
        }),
        [],
    )

    return (
        <>
            <mui.component.Box component={'div'} sx={sxContent}>
                {children}
            </mui.component.Box>
            <mui.component.Box
                component={'div'}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignContent: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                <app.component.divider.Divider orientation={'vertical'} />
            </mui.component.Box>
            <mui.component.Box
                component={'div'}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                }}
            >
                <app.component.divider.Divider orientation={'horizontal'} />
            </mui.component.Box>
        </>
    )
}
