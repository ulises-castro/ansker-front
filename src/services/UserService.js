import Catch from 'await-to-decorater'
import {
  post
} from './api'

class User {
  @Catch()
  sendContactMessage(data) {
    return post(`user/contact`, data)
  }

  @Catch()
  sendDevice(data) {
    return post(`device/register`, data)
  }

  @Catch()
  sendDeviceUser(data) {
    return post(`device/register/user`, data)
  }
}

export default new User()