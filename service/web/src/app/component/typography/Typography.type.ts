import { appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { ElementType } from 'react'

export type TypographyProps = {
    children?: appType.TypeChildrenProps
    component?: ElementType
    variant?: muiType.TypographyProps['variant']
    noWrap?: muiType.TypographyProps['noWrap']
    typographyProps?: muiType.TypographyProps
    space?: appType.TypeSettingThemeComponentSpace
}
