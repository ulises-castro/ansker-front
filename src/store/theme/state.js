import { jsonParseStored } from 'src/utils'

export default function () {
  return {
    showElements: jsonParseStored('showElements', {
      hotCities: true,
      discoverShare: true
    })
  }
}
