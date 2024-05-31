import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { crud } from './crud'
import { field } from './field'
import { loading } from './loading'
import { underConstruction } from './under-construction'

export const component = {
    component: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...crud,
        ...field,
        ...loading,
        ...underConstruction,
    },
}
