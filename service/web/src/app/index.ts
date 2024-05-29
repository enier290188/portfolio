import './App.css'
import App from './App.tsx'
import { asset } from './asset'
import { component } from './component'
import { context } from './context'
import { hook } from './hook'
import { layout } from './layout'
import { service } from './service'
import * as appServiceApiPageAccountType from './service/api/page/account/account.type.ts'
import * as appServiceApiPageWorkspaceAdminType from './service/api/page/workspace/admin/admin.type.ts'
import * as appServiceApiPageWorkspaceProjectType from './service/api/page/workspace/project/project.type.ts'
import * as appServiceApiPageWorkspaceRootType from './service/api/page/workspace/root/root.type.ts'
import * as appServiceApiPageWorkspaceSaleType from './service/api/page/workspace/sale/sale.type.ts'
import * as appServiceApiSyncAccountType from './service/api/sync/account/account.type.ts'
import { setting } from './setting'
import { sync } from './sync'
import * as appType from './type'

export const app = {
    asset,
    component,
    context,
    hook,
    layout,
    service,
    setting,
    sync,
}

export type { appType }
export type { appServiceApiPageAccountType }
export type { appServiceApiPageWorkspaceAdminType }
export type { appServiceApiPageWorkspaceProjectType }
export type { appServiceApiPageWorkspaceRootType }
export type { appServiceApiPageWorkspaceSaleType }
export type { appServiceApiSyncAccountType }

export default App
