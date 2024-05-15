import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type ImageCropProps = {
    aspect?: 1
    scale?: 1
    rotate?: 0
    id: string
    value: string
    variant?: muiType.AvatarProps['variant']
    defaultIcon?: appType.FunctionComponent
    label?: muiType.TextFieldProps['label']
    error?: muiType.TextFieldProps['error']
    helperText?: muiType.TextFieldProps['helperText']
    required?: muiType.TextFieldProps['required']
    disabled?: muiType.TextFieldProps['disabled']
    isSubmitting?: boolean
    space?: appType.ComponentSpace
    onActionReset: () => void
    onActionDelete: () => void
    onActionCropComplete: (value: string) => void
}
