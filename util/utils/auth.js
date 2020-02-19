import Cookies from 'js-cookie'

const Token = "token"
export function getToken () {
    return Cookies.get(Token)
}

export function setToken (value) {
    return Cookies.set(Token, value)
}

export function removeToken (key) {
    return Cookies.remove(key)
}