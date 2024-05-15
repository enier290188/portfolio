import { appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { ElementType } from 'react'

export type MenuItemButtonProps = {
    children?: appType.ChildrenProps
    component?: ElementType
    disabled?: muiType.ButtonProps['disabled']
    onClick?: muiType.MenuItemProps['onClick']
    menuItemProps?: muiType.MenuItemProps
    space?: appType.ComponentSpace
    underline?: true | false
    match?: true | false
    matchDisable?: true | false
    typographyProps?: muiType.TypographyProps
}
