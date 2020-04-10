export const jsonParseStored = (key, defaultValue = false) => {
  const valueStored = localStorage[key]
  if (valueStored) return localStorage.JSON.parse(value)
  return defaultValue
}