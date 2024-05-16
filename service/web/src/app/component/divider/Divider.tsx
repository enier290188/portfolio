import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { DividerProps } from './Divider.type.ts'

export const Divider = ({ component = 'div', orientation = 'horizontal', dividerProps, space = 0 }: DividerProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
            boxShadow: `0px 1px 4px 0px ${theme.palette.divider}, 0px -1px 4px 0px ${theme.palette.divider}`,
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    const dividerPropsRest: muiType.DividerProps = dividerProps ? { ...dividerProps } : {}

    return <mui.component.Divider component={component} orientation={orientation} flexItem={true} sx={sxContent} {...dividerPropsRest} />
}
