import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { create } from './create'
import { id } from './id'

export const company = {
    company: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...create,
        ...id,
    },
}
