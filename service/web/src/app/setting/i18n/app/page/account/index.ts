import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { forgot } from './forgot'
import { login } from './login'
import { logout } from './logout'
import { profile } from './profile'

export const account = {
    account: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...forgot,
        ...login,
        ...logout,
        ...profile
    }
}
