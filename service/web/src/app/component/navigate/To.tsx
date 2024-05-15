import { router, routerType } from '@./package/react-router'

export const To = ({ to }: { to: routerType.NavLinkProps['to'] }) => {
    return <router.component.Navigate to={to} />
}
