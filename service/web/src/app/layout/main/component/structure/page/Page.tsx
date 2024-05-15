import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Page = ({ children, maxWidth = 'false', boxProps }: { children: appType.TypeChildrenProps; maxWidth?: muiType.BoxProps['maxWidth']; boxProps?: muiType.BoxProps }) => {
    const sxPage = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',
        }),
        [],
    )
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
            backgroundColor: theme.palette.common.white,
            borderRadius: 1,
            boxShadow: {
                xs: 'none',
                md: `0px 1px 4px 0px ${theme.palette.divider}, 0px -1px 4px 0px ${theme.palette.divider}, 1px 0px 4px 0px ${theme.palette.divider}, -1px 0px 4px 0px ${theme.palette.divider}`,
            },
            overflow: 'hidden hidden',
        }),
        [],
    )

    const boxPropsRest: muiType.BoxProps = boxProps ? { ...boxProps } : {}

    return (
        <mui.component.Box component={'div'} sx={sxPage}>
            <mui.component.Box component={'div'} maxWidth={maxWidth} sx={sxContent} {...boxPropsRest}>
                {children}
            </mui.component.Box>
        </mui.component.Box>
    )
}
