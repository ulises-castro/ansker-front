import Catch from 'await-to-decorater'
import {
  get,
  post
} from './api'

class Publication {

  @Catch()
  getOne(id) {
    return get(`publication/${id}`)
  }

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
  publish(data) {
    console.log(data)
    return post(`publication/publish`, data)
  }
}

export default new Publication()