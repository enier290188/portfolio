import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { dashboard } from './dashboard'

export const root = {
    root: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...dashboard,
    },
}
