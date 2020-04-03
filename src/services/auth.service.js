import axios from 'axios'
import * as queryString from 'query-string'
import {
  get,
  post
} from './api'

class AuthService {
  login(user) {

  }

  getGoogleLink() {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_ID,
      redirect_uri: `${process.env.BASE_URL}/authenticate/google`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  }

  async googleLogin(code) {
    const response = await get('authenticate/google', {
      code
    })

    return response
  }
}

export default new AuthService
