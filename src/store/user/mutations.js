export function login (state, token) {
  localStorage.token = token
  state.token = token
  state.isLogged = true
}
