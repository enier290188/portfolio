import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { info } from './info'
import { password } from './password'
import { picture } from './picture'

export const profile = {
    profile: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...info,
        ...password,
        ...picture,
    },
}
