import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { boundary } from './boundary'
import { forbidden } from './forbidden'
import { notFound } from './not-found'

export const error = {
    error: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...boundary,
        ...forbidden,
        ...notFound
    }
}
