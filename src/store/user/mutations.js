export function login (state, token) {
  localStorage.token = token
  localStorage.isLogged = true
  state.token = token
  state.isLogged = true
}

export function logout (state, token) {
  localStorage.clear()
  state.token = false
  state.isLogged = false
}

export function updateSelectedCity (state, selectedCity) {
  localStorage.selectedCity = JSON.stringify(selectedCity)

  state.selectedCity = selectedCity
}

export function setPushToken (state, pushToken) {
  localStorage.pushToken = pushToken

  state.pushToken = pushToken
}