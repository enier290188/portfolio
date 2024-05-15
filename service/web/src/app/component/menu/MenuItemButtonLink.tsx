import { app } from '@./app'
import { router, routerType } from '@./package/react-router'
import React from 'react'
import { MenuItemButtonProps } from './MenuItemButton.type.ts'

export const MenuItemButtonLink = ({ children, disabled, onClick, menuItemProps, space, underline = true, matchDisable = false, typographyProps, to }: Omit<MenuItemButtonProps, 'component' | 'match'> & { to: routerType.NavLinkProps['to'] }) => {
    const resolvedPath = router.hook.useResolvedPath(to)
    const match = router.hook.useMatch({ path: resolvedPath.pathname, end: false })

    const NavLinkBehavior = React.forwardRef<never, Omit<routerType.NavLinkProps, 'to'>>((props, ref) => <router.component.NavLink ref={ref} to={to} {...props} role={'link'} />)
    NavLinkBehavior.displayName = 'ButtonLink'

    return (
        <app.component.menu.MenuItemButton component={NavLinkBehavior} disabled={disabled} onClick={onClick} menuItemProps={menuItemProps} space={space} underline={underline} match={!!match} matchDisable={matchDisable} typographyProps={typographyProps}>
            {children}
        </app.component.menu.MenuItemButton>
    )
}
