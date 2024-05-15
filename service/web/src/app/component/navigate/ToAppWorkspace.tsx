import { app } from '@./app'

export const ToAppWorkspace = () => {
    return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace).getTo()} />
}
