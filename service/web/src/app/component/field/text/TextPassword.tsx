import { mui } from '@./package/material-ui'
import React from 'react'
import { Text } from './Text.tsx'
import { TextProps } from './Text.type.ts'

export const TextPassword = ({ required, autoComplete, label, variant, color, size, fullWidth, error, helperText, disabled, autoFocus, textFieldProps, space, field }: Omit<TextProps, 'type' | 'InputProps'>) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <Text
            type={showPassword ? 'text' : 'password'}
            required={required}
            autoComplete={autoComplete}
            InputProps={{
                startAdornment: (
                    <mui.component.InputAdornment position={'start'}>
                        <mui.icon.Password />
                    </mui.component.InputAdornment>
                ),
                endAdornment: (
                    <mui.component.InputAdornment position={'end'} sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} onMouseLeave={() => setShowPassword(false)}>
                        {showPassword ? <mui.icon.VisibilityOff /> : <mui.icon.Visibility />}
                    </mui.component.InputAdornment>
                )
            }}
            label={label}
            variant={variant}
            color={color}
            size={size}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            disabled={disabled}
            autoFocus={autoFocus}
            textFieldProps={textFieldProps}
            space={space}
            field={field}
        />
    )
}
