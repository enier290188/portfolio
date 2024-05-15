import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { TypographyProps } from './Typography.type.ts'

export const Typography = ({ children, component = 'div', variant = 'body1', noWrap = true, typographyProps, space = 0 }: TypographyProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    let svgFontSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
    switch (variant) {
        case 'h1':
            svgFontSize = 'h1'
            break
        case 'h2':
            svgFontSize = 'h2'
            break
        case 'h3':
            svgFontSize = 'h3'
            break
        case 'h4':
            svgFontSize = 'h4'
            break
        case 'h5':
            svgFontSize = 'h5'
            break
        case 'h6':
            svgFontSize = 'h6'
            break
        case 'body1':
            svgFontSize = 'h6'
            break
        case 'body2':
            svgFontSize = 'h6'
            break
        case 'caption':
            svgFontSize = 'caption'
            break
        default:
            svgFontSize = 'body1'
    }

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
            '& > svg': {
                margin: theme.spacing(0, 1, 0, 0),
                fontSize: theme.typography[svgFontSize].fontSize
            },
            '& > .MuiAvatar-root': {
                // width: `${theme.typography[svgFontSize].fontSize} !important`,
                // height: `${theme.typography[svgFontSize].fontSize} !important`,
                margin: theme.spacing(0, 1, 0, 0)
            },
            '& > .MuiCircularProgress-root': {
                width: `${theme.typography[svgFontSize].fontSize} !important`,
                height: `${theme.typography[svgFontSize].fontSize} !important`,
                margin: theme.spacing(0, 1, 0, 0)
            }
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft, svgFontSize]
    )

    const typographyPropsRest: muiType.TypographyProps = typographyProps ? { ...typographyProps } : {}

    return (
        <mui.component.Typography component={component} variant={variant} noWrap={noWrap} sx={sxContent} {...typographyPropsRest}>
            {children}
        </mui.component.Typography>
    )
}
