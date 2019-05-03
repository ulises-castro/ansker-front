import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
// import User from './User'
import UserData from './models/UserData';

import axios from 'axios';

// import secrets from './secrets'

Vue.use(Vuex);

// Create new instance of Database.
const database = new VuexORM.Database();

// Register Model and Module. The first argument is the Model, and second
// is the Module.
// database.register(User, users)
database.register(UserData);
// database.register(Secret, secrets)
const state = {
  token: localStorage.token || '',
  user: localStorage.user
    ? JSON.parse(localStorage.user) : {},
  hideShareAdvice: localStorage.hideShareAdvice
  ? JSON.parse(localStorage.hideShareAdvice) : false,
};

const actions = {
  logout({ commit }) {
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  login({ commit }, dataObj) {
    const { token, user } = dataObj;

    commit('authSuccess', token, user);
    commit('updateUser', user);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  hideShareAdvice({ commit }) {
    commit('hideShareAdvice');

    localStorage.hideShareAdvice = 'true';
  },
  userLocation({ commit, state }, locationObj) {
    const user = state.user;
    user.location = locationObj;

    commit('updateUser', user);
  },
};

const mutations = {
  authSuccess({ state }, token) {
    localStorage.token = token;
    state.token = token;
  },
  hideShareAdvice(state) {
    state.hideShareAdvice = true;
  },
  logout(state) {
    state.authStatus = '';
    state.token = '';
  },
  updateUser(state, user) {
    localStorage.user = JSON.stringify(user);
    state.user = user;
  },
  // TODO: Check this to thinking in how to do it
  authError() {},
};

const getters = {
  isLogged: state => !!state.token,
  showShareAdvice: state => !state.hideShareAdvice,
  userLocation: state => state.user.location,
};

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state,
  actions,
  mutations,
  getters,
});

export default store;