import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { dashboard } from './dashboard'
import { lead } from './lead'

export const sale = {
    sale: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...dashboard,
        ...lead,
    },
}
