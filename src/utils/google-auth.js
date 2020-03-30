import * as queryString from 'query-string'

const stringifiedParams = queryString.stringify({
  client_id: process.env.GOOGLE_ID,
  redirect_uri: `${process.env.API}/authenticate/google`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
})

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`

export default googleLoginUrl
