import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { CheckboxProps } from './Checkbox.type.tsx'

export const Checkbox = ({ required = true, label = '', color = 'primary', size = 'small', disabled = false, autoFocus = false, checkboxProps, space = 0, field }: CheckboxProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(),
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    const checkboxPropsRest: muiType.CheckboxProps = checkboxProps ? { ...checkboxProps } : {}

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        field.disabled = disabled // This line is very important
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        checkboxPropsRest.checked = field.value // This line is very important
    } catch (e) {
        /* empty */
    }

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            <mui.component.FormControlLabel required={required} label={label} control={<mui.component.Checkbox icon={<mui.icon.RadioButtonUnchecked />} checkedIcon={<mui.icon.RadioButtonChecked />} required={required} color={color} size={size} disabled={disabled} disableRipple={false} autoFocus={autoFocus} {...checkboxPropsRest} {...field} />} />
        </mui.component.Box>
    )
}
