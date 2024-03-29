import { jsonParseStored } from 'src/utils'

export default function () {
  return {
    isLogged: jsonParseStored('isLogged'),
    token: jsonParseStored('token', ''),
    selectedCity: jsonParseStored('selectedCity', {}),
    pushToken: jsonParseStored('pushToken', '')
  }
}
