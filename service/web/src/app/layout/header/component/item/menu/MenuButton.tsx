import { app, appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { router, routerType } from '@./package/react-router'
import React from 'react'

export const MenuButton = ({ children, toList = [], disabled, onClick }: { children: appType.TypeChildrenProps; toList?: routerType.NavLinkProps['to'][]; disabled?: muiType.ButtonProps['disabled']; onClick?: muiType.ButtonProps['onClick'] }) => {
    let isActive = false
    for (const to of toList) {
        const resolvedPath = router.hook.useResolvedPath(to)
        const match = router.hook.useMatch({ path: resolvedPath.pathname, end: false })
        if (!isActive && match) {
            isActive = true
        }
    }

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
            },
        }),
        [isActive],
    )

    return (
        <app.component.button.Button disabled={disabled} onClick={onClick} buttonProps={{ sx: sxContent }} typographyProps={{ variant: 'body1' }}>
            {children}
        </app.component.button.Button>
    )
}
