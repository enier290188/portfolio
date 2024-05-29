import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type CheckboxProps = {
    required?: muiType.FormControlLabelProps['required']
    label?: muiType.FormControlLabelProps['label']
    color?: muiType.CheckboxProps['color']
    size?: muiType.CheckboxProps['size']
    disabled?: muiType.CheckboxProps['disabled']
    autoFocus?: muiType.CheckboxProps['autoFocus']
    checkboxProps?: muiType.CheckboxProps
    space?: appType.TypeSettingThemeComponentSpace
    field: object
}
