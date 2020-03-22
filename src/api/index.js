import axios from 'axios';

const baseURL = process.env.VUE_APP_API;

const get = async function (resource, data) {
  return axios.get(`${baseURL}/${resource}`, data);
};

const post = async function (resource, data) {
  return axios.post(`${baseURL}/${resource}`, data);
};

const put = async function (resource, data) {
  return axios.put(`${baseURL}/${resource}`, data);
};

const remove = async function (resource, data) {
  return axios.delete(`${baseURL}/${resource}`, data);
};

export {
 get, post, put, remove,
};
