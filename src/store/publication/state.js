import { jsonParseStored } from 'src/utils'

export default function () {
  return {
    cities: jsonParseStored(localStorage.cities, [])
  }
}
