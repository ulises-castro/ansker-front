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
  voteUp(publicationId) {
    return post(`publication/voteUp`, { publicationId })
  }

  @Catch()
  getAllByCity(params) {
    const { countryCode, city } = params

    return get(`publication/filter/${countryCode}/${city}/${params.pageNumber}`)
  }

  @Catch()
  getAll(params) {
    return get(`publication/filter/all/${params.pageNumber}`)
  }

  @Catch()
  userHadLiked() {
  }

  @Catch()
  publish(data) {
    return post(`publication/publish`, data)
  }

  @Catch()
  report(publicationId) {
    return post(`publication/report`, publicationId)
  }

  @Catch()
  publishComment(data) {
    return post(`publication/comment/publish`, data)
  }

  @Catch()
  fetchComments(publicationId, isLoggedUser = false) {
    if (isLoggedUser) return get(`publication/comment/getAll/${publicationId}`, publicationId)
    else return get(`publication/comment/public/getAll/${publicationId}`, publicationId)
  }

  @Catch()
  fetchCommentsByGuest(publicationId) {
    return get(`publication/comment/getAllVisitor/${publicationId}`, publicationId)
  }

}

export default new Publication()