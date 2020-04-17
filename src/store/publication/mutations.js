export function addCities (state, cities) {
  const newCities = cities.map(cities => cities)

  state.cities = newCities
}
