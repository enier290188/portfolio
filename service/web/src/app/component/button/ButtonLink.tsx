import { app } from '@./app'
import { router, routerType } from '@./package/react-router'
import React from 'react'
import { ButtonProps } from './Button.type.ts'

export const ButtonLink = ({ children, type, variant, color, size, disabled, onClick, buttonProps, space, underline = true, matchDisable = false, typographyProps, to }: Omit<ButtonProps, 'component' | 'match'> & { to: routerType.NavLinkProps['to'] }) => {
    const resolvedPath = router.hook.useResolvedPath(to)
    const match = router.hook.useMatch({ path: resolvedPath.pathname, end: false })

    const NavLinkBehavior = React.forwardRef<never, Omit<routerType.NavLinkProps, 'to'>>((props, ref) => <router.component.NavLink ref={ref} to={to} {...props} role={'link'} />)
    NavLinkBehavior.displayName = 'ButtonLink'

    return (
        <app.component.button.Button component={NavLinkBehavior} type={type} variant={variant} color={color} size={size} disabled={disabled} onClick={onClick} buttonProps={buttonProps} space={space} underline={underline} match={!!match} matchDisable={matchDisable} typographyProps={typographyProps}>
            {children}
        </app.component.button.Button>
    )
}
