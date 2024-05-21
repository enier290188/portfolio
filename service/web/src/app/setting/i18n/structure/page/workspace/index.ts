import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { admin } from './admin'
import { project } from './project'
import { root } from './root'
import { sale } from './sale'

export const workspace = {
    workspace: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...root,
        ...admin,
        ...project,
        ...sale,
    },
}
