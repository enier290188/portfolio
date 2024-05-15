import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Main = ({ children, maxWidth = false }: { children: appType.TypeChildrenProps; maxWidth?: muiType.ContainerProps['maxWidth'] }) => {
    const sxMain = React.useCallback(
        (theme: muiType.Theme) => ({
            flexGrow: 1,
            margin: theme.spacing(0),
            padding: {
                xs: theme.spacing(0),
                md: theme.spacing(2),
            },
            backgroundColor: {
                xs: theme.palette.common.white,
                md: theme.palette.grey['100'],
            },
            color: theme.palette.text.primary,
            overflow: 'hidden auto',
        }),
        [],
    )
    const sxContent = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }),
        [],
    )

    return (
        <mui.component.Box component={'main'} sx={sxMain}>
            <mui.component.Container component={'div'} maxWidth={maxWidth} disableGutters={true}>
                <mui.component.Box component={'div'} sx={sxContent}>
                    {children}
                </mui.component.Box>
            </mui.component.Container>
        </mui.component.Box>
    )
}
