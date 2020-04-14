export function login ({ commit }, token) {
  return commit('login', token)
}

export function logout ({ commit }, token) {
  commit('logout')
}
