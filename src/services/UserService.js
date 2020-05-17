import Catch from 'await-to-decorater'
import {
  post
} from './api'

class User {
  @Catch()
  sendContactMessage(data) {
    return post(`user/contact`, data)
  }
}

export default new User()