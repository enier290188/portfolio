import { app } from '@./app'

export const ToAppErrorForbidden = () => {
    return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.error.forbidden).getTo()} />
}
