import axios from 'axios'

const apiUrl = process.env.API

if (localStorage.authToken) {
  axios.defaults.headers.common['Authorization'] = `token ${localStorage.authToken}`
}

const getUrl = (url) => {
  return apiUrl + url
}

function get(url, params = {}) {
  url = getUrl(url)

  return axios.get(url, {
      params: {
        ...params
      }
    })
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
