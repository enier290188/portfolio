import { app, appType } from '@./app'

export const Title = ({ children, level }: { children: appType.ChildrenProps; level: 1 | 2 | 3 }) => {
    let variant: 'h5' | 'h6' | 'body1' | 'body2'
    switch (level) {
        case 1:
            variant = 'h5'
            break
        case 2:
            variant = 'h6'
            break
        case 3:
            variant = 'body1'
            break
        default:
            variant = 'body2'
    }

    return (
        <app.component.typography.Typography space={1} variant={variant}>
            {children}
        </app.component.typography.Typography>
    )
}
