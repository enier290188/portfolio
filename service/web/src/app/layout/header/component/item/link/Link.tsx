import { app, appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { router, routerType } from '@./package/react-router'
import React from 'react'

export const Link = ({ children, to }: { children: appType.TypeChildrenProps; to: routerType.NavLinkProps['to'] }) => {
    const resolvedPath = router.hook.useResolvedPath(to)
    const match = router.hook.useMatch({ path: resolvedPath.pathname, end: false })
    const isActive = !!match

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: 0,
            margin: theme.spacing(0.5),
            padding: theme.spacing(0.5, 1, 0.5, 1),
            color: theme.palette.common.white,
            textDecoration: isActive ? 'underline' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
                textDecoration: isActive ? 'underline' : 'none',
                cursor: isActive ? 'default' : 'pointer',
            },
        }),
        [isActive],
    )

    const handleOnClick = React.useCallback(
        (e: appType.TypeMouseEvent<HTMLElement>) => {
            if (isActive) {
                e.preventDefault()
            }
        },
        [isActive],
    )

    return (
        <app.component.button.ButtonLink to={to} onClick={handleOnClick} buttonProps={{ sx: sxContent }} typographyProps={{ variant: 'body1' }}>
            {children}
        </app.component.button.ButtonLink>
    )
}
