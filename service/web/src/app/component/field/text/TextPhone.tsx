import { mui } from '@./package/material-ui'
import { Text } from './Text.tsx'
import { TextProps } from './Text.type.ts'

export const TextPhone = ({ required, autoComplete, label, variant, color, size, fullWidth, error, helperText, disabled, autoFocus, textFieldProps, space, field }: Omit<TextProps, 'type' | 'InputProps'>) => {
    return (
        <Text
            type={'phone'}
            required={required}
            autoComplete={autoComplete}
            InputProps={{
                startAdornment: (
                    <mui.component.InputAdornment position={'start'}>
                        <mui.icon.Phone />
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
