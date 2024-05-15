import { app, appType } from '@./app'

export const List = ({ children }: { children: appType.ChildrenProps }) => {
    return <app.component.menu.MenuList space={{ top: 2, right: 0, bottom: 2, left: 0 }}>{children}</app.component.menu.MenuList>
}
