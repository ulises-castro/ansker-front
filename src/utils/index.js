export const jsonParseStored = (key, defaultValue = false) => {
  const valueStored = localStorage[key]

  if (valueStored && typeof valueStored !== 'string') return JSON.parse(valueStored)
  else if (valueStored) return valueStored

  return defaultValue
}