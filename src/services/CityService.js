import Catch from 'await-to-decorater'
import {
  get
} from './api'

class City {
  @Catch()
  searchCity(city) {
    return get(`searchPlace/city/${city}`)
  }
}

export default new City()