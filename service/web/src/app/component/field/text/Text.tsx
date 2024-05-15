import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { TextProps } from './Text.type.ts'

export const Text = ({ type = 'text', required = true, autoComplete = 'off', InputProps, label = '', variant = 'outlined', color = 'primary', size = 'small', fullWidth = true, error = false, helperText = '', disabled = false, autoFocus = false, textFieldProps, space = 0, field }: TextProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0)
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft]
    )

    const textFieldPropsRest: muiType.TextFieldProps = textFieldProps ? { ...textFieldProps } : {}

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        field.disabled = disabled // This line is very important
    } catch (e) {
        /* empty */
    }

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            <mui.component.TextField type={type} required={required} autoComplete={autoComplete} InputProps={InputProps} label={label} variant={variant} color={color} size={size} fullWidth={fullWidth} error={error} helperText={<span dangerouslySetInnerHTML={{ __html: helperText ?? '' }} />} disabled={disabled} autoFocus={autoFocus} {...textFieldPropsRest} {...field} />
        </mui.component.Box>
    )
}
