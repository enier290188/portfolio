import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type AutocompleteProps = {
    required?: muiType.TextFieldProps['required']
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
    selected: null | {
        id: string
        label: string
    }
    options: {
        id: string
        label: string
    }[]
    onChange: (value: null | { id: string; label: string }) => void
}
