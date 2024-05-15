import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { remove } from './remove'
import { update } from './update'

export const id = {
    id: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...update,
        ...remove,
    },
}
