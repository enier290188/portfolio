import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { account } from './account'
import { error } from './error'
import { workspace } from './workspace'

export const page = {
    page: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...account,
        ...error,
        ...workspace,
    },
}
