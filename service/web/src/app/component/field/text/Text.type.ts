import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type TextProps = {
    type?: muiType.TextFieldProps['type']
    required?: muiType.TextFieldProps['required']
    autoComplete?: muiType.TextFieldProps['autoComplete']
    InputProps?: muiType.TextFieldProps['InputProps']
    label?: muiType.TextFieldProps['label']
    variant?: muiType.TextFieldProps['variant']
    color?: muiType.TextFieldProps['color']
    size?: muiType.TextFieldProps['size']
    fullWidth?: muiType.TextFieldProps['fullWidth']
    error?: muiType.TextFieldProps['error']
    helperText?: muiType.TextFieldProps['helperText']
    disabled?: muiType.TextFieldProps['disabled']
    autoFocus?: muiType.TextFieldProps['autoFocus']
    textFieldProps?: muiType.TextFieldProps
    space?: appType.TypeSettingThemeComponentSpace
    field: object
}
