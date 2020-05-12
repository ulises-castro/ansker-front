import Catch from 'await-to-decorater'
import {
  get,
  post
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

  @Catch()
  sendPublish() {
    return get(`publish/:country/:city`)
  }
}

export default new Publication()