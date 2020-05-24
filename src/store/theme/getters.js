export function showHotCities (state) {
  if (state.showElements.hotCities) {
    return ['cities']
  }

  return []
}

export function showDiscoverShare (state) {
  return state.showElements.discoverShare
}