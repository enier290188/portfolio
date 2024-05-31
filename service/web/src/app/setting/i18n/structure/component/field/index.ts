import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { autocomplete } from './autocomplete'

export const field = {
    field: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...autocomplete,
    },
}
