import { app } from '@./app'
import { router } from '@./package/react-router'

export const ToAppAccountLogin = () => {
    const location = router.hook.useLocation()
    const toAppAccountLogin = app.setting.route.getNode(app.setting.route.app.account.login).getTo()
    const toAppAccountLogout = app.setting.route.getNode(app.setting.route.app.account.logout).getTo()
    const toAppWorkspace = app.setting.route.getNode(app.setting.route.app.workspace).getTo()
    const toFrom = location?.pathname ?? toAppAccountLogin

    return <app.component.navigate.To to={toFrom !== toAppAccountLogin && toFrom !== toAppAccountLogout && toFrom !== toAppWorkspace ? `${toAppAccountLogin}?urlTo=${toFrom}` : toAppAccountLogin} />
}
