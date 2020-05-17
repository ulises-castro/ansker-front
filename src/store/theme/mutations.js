export function hideDiscoverShare (state) {
  state.showElements.discoverShare = false

  updateShowElements(state.showElements)
}

export function hideHotCities (state, hide) {
  state.showElements.hotCities = !hide
  updateShowElements(state.showElements)
}

export function updateShowElements(showElements) {
  localStorage.showElements = JSON.stringify(showElements)
}
