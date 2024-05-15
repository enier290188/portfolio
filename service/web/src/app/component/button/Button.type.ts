import { appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { ElementType } from 'react'

export type ButtonProps = {
    children?: appType.TypeChildrenProps
    component?: ElementType
    type?: muiType.ButtonProps['type']
    variant?: muiType.ButtonProps['variant']
    color?: muiType.ButtonProps['color']
    size?: muiType.ButtonProps['size']
    disabled?: muiType.ButtonProps['disabled']
    onClick?: muiType.ButtonProps['onClick']
    buttonProps?: muiType.ButtonProps
    space?: appType.TypeSettingThemeComponentSpace
    underline?: true | false
    match?: true | false
    matchDisable?: true | false
    typographyProps?: muiType.TypographyProps
}
