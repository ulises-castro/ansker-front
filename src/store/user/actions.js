import { pushToken } from "./getters"

export function login ({ commit }, token) {
  commit('login', token)
}

export function logout ({ commit }, token) {
  commit('logout')
}

export function selectCity ({ commit }, city) {
  commit('updateSelectedCity', city)
}

export function setPushToken ({ commit }, pushToken) {
  commit('setPushToken', pushToken)
}
