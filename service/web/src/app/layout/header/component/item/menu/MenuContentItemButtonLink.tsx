import { app, appType } from '@./app'
import { routerType } from '@./package/react-router'

export const MenuContentItemButtonLink = ({ children, to }: { children: appType.TypeChildrenProps; to: routerType.NavLinkProps['to'] }) => {
    return (
        <app.component.menu.MenuItemButtonLink to={to} underline={false} matchDisable={true}>
            {children}
        </app.component.menu.MenuItemButtonLink>
    )
}
