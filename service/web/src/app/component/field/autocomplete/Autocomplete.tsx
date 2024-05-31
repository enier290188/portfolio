import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { AutocompleteProps } from './Autocomplete.type.ts'

export const Autocomplete = ({ required = true, InputProps, label = '', variant = 'outlined', color = 'primary', size = 'small', fullWidth = true, error = false, helperText = '', disabled = false, autoFocus = false, textFieldProps, space = 0, field }: AutocompleteProps) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.field.autocomplete, i18nLanguage), [i18nLanguage])

    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    const textFieldPropsRest: muiType.TextFieldProps = textFieldProps ? { ...textFieldProps } : {}

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        field.disabled = disabled // This line is very important
    } catch (e) {
        /* empty */
    }

    console.log(field)

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            <mui.component.Autocomplete
                //
                multiple={false}
                size={size}
                fullWidth={fullWidth}
                disabled={disabled}
                disablePortal={true}
                disableCloseOnSelect={false}
                autoHighlight={true}
                clearText={''}
                openText={''}
                closeText={''}
                options={[]}
                noOptionsText={<>{i18n.getText('no-options')}</>}
                renderInput={(params) => (
                    <mui.component.TextField
                        //
                        {...params}
                        type={'text'}
                        required={required}
                        autoComplete={'off'}
                        InputProps={{
                            ...params.InputProps,
                            ...InputProps,
                        }}
                        label={label}
                        variant={variant}
                        color={color}
                        error={error}
                        helperText={<span dangerouslySetInnerHTML={{ __html: helperText ?? '' }} />}
                        autoFocus={autoFocus}
                        {...textFieldPropsRest}
                    />
                )}
                {...field}
            />
        </mui.component.Box>
    )
}
