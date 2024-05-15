import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { component } from './component'
import { layout } from './layout'
import { page } from './page'

export const app = {
    app: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...component,
        ...layout,
        ...page
    }
}
