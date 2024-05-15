import { app, appType } from '@./app'
import { muiType } from '@./package/material-ui'

export const ListItemButton = ({ children, match, onClick }: { children: appType.TypeChildrenProps; match?: true | false; onClick?: muiType.MenuItemProps['onClick'] }) => {
    return (
        <app.component.menu.MenuItemButton underline={false} match={match} matchDisable={true} onClick={onClick}>
            {children}
        </app.component.menu.MenuItemButton>
    )
}
