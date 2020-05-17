export function hideDiscoverShare (state) {
  state.showElements.discoverShare = false

  updateShowElements(state.showElements)
}

export function toggleHotCities (state) {
  state.showElements.hotCities = !state.showElements.hotCities

  updateShowElements(state.showElements)
}

export function updateShowElements(showElements) {
  localStorage.showElements = JSON.stringify(showElements)
}
