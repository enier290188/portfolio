import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { application } from './application'
import { user } from './user'

export const setting = {
    setting: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...application,
        ...user,
    },
}
