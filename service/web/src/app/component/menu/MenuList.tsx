import { app, appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React, { ElementType } from 'react'

export const MenuList = ({ children, component = 'div', space = 0 }: { children: appType.TypeChildrenProps; component?: ElementType; space?: appType.TypeSettingThemeComponentSpace }) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    return (
        <mui.component.MenuList component={component} sx={sxContent}>
            {children}
        </mui.component.MenuList>
    )
}
