import { app } from '@./app'
import { ButtonProps } from './Button.type.ts'

export const ButtonSubmit = ({ children, component, type, variant = 'contained', color, size, disabled, onClick, buttonProps, space, underline, match, matchDisable, typographyProps }: ButtonProps) => {
    return (
        <app.component.button.Button component={component} type={type} variant={variant} color={color} size={size} disabled={disabled} onClick={onClick} buttonProps={buttonProps} space={space} underline={underline} match={match} matchDisable={matchDisable} typographyProps={typographyProps}>
            {children}
        </app.component.button.Button>
    )
}
