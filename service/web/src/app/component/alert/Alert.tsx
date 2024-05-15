import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { AlertProps } from './Alert.type.ts'

export const Alert = ({ children, variant = 'standard', severity = 'info', onClose, alertProps, space = 0 }: AlertProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(2, 4),
            boxShadow: `0px 1px 4px 0px ${theme.palette.divider}, 0px -1px 4px 0px ${theme.palette.divider}, 1px 0px 4px 0px ${theme.palette.divider}, -1px 0px 4px 0px ${theme.palette.divider}`
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft]
    )

    const alertPropsRest: muiType.AlertProps = alertProps ? { ...alertProps } : {}

    return (
        <mui.component.Alert variant={variant} severity={severity} onClose={onClose} sx={sxContent} {...alertPropsRest}>
            {children}
        </mui.component.Alert>
    )
}
