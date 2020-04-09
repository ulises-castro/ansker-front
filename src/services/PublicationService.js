import Catch from 'await-to-decorater'
import {
  get
} from './api'

class Publication {
  @Catch()
  getLikes() {
  }

  @Catch()
  getById(id) {

  }

  @Catch()
  getAllByCity(city) {
    return get(`publication/filter/city`, {
      city
    })
  }

  @Catch()
  userHadLiked() {
  }
}

export default new Publication()