import axios from 'axios';

const baseURL = process.env.BASE_URL;

export default {
  get: async function(url, data) {
    return axios.get(`${baseURL}/${url}`, data);
  },
  post: async function(url, data) {
    return axios.post(`${baseURL}/${url}`, data);
  },
  put: async function(url) {
    return axios.put(`${baseURL}/${url}`, data);
  },
  delete: async function(url) {
    return axios.delete(`${baseURL}/${url}`, data);
  }
}
