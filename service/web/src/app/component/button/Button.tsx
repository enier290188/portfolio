import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { ButtonProps } from './Button.type.ts'

export const Button = ({ children, component = 'div', type = 'button', variant = 'outlined', color = 'primary', size = 'small', disabled = false, onClick, buttonProps, space = 0, underline = false, match = false, matchDisable = false, typographyProps }: ButtonProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: 0,
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(1, 2, 1, 2),
            textDecoration: underline || match ? 'underline' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
                textDecoration: underline || match ? 'underline' : 'none',
                cursor: match && matchDisable ? 'default' : 'pointer',
            },
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft, underline, match, matchDisable],
    )

    const buttonPropsRest: muiType.ButtonProps = buttonProps ? { ...buttonProps } : {}

    return (
        <mui.component.Button component={component} type={type} variant={variant} color={color} size={size} disabled={disabled || (match && matchDisable)} onClick={onClick} sx={sxContent} {...buttonPropsRest}>
            <app.component.typography.Typography variant={'body1'} noWrap={true} typographyProps={typographyProps}>
                {children}
            </app.component.typography.Typography>
        </mui.component.Button>
    )
}
