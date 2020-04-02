import axios from 'axios'
// import * as process from 'process';

// TODO: Fix this my friend
const apiUrl = process.env.API

if (localStorage.authToken) {
  axios.defaults.headers.common['Authorization'] = `token ${localStorage.authToken}`
}

const getUrl = (url) => {
  if (url.includes('perfectpitchtech.com')) return url
  else return apiUrl + url
}

async function get(url, params = {}) {
  url = getUrl(url)

  try {
    return await axios.get(url, {
      ...params
    })
  } catch (error) {
    return error.response;
  }
}

async function post(url, params = {}) {
  url = getUrl(url)

  try {
    return await axios.post(url, {
      ...params
    })
  } catch (error) {
    return error.response;
  }
}

export {
  get,
  post,
}
