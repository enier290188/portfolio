import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { MenuItemButtonProps } from './MenuItemButton.type.ts'

export const MenuItemButton = ({ children, component = 'div', disabled = false, onClick, menuItemProps, space = 0, underline = false, match = false, matchDisable = false, typographyProps }: MenuItemButtonProps) => {
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
            padding: theme.spacing(2, 5, 2, 3),
            color: theme.palette.primary.dark,
            textDecoration: underline || match ? 'underline' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
                textDecoration: underline || match ? 'underline' : 'none',
                cursor: match ? 'default' : 'pointer'
            }
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft, underline, match]
    )

    const menuItemPropsRest: muiType.MenuItemProps = menuItemProps ? { ...menuItemProps } : {}

    return (
        <mui.component.MenuItem component={component} disabled={disabled || (match && matchDisable)} onClick={onClick} sx={sxContent} {...menuItemPropsRest}>
            <app.component.typography.Typography variant={'body1'} noWrap={true} typographyProps={typographyProps}>
                {children}
            </app.component.typography.Typography>
        </mui.component.MenuItem>
    )
}
