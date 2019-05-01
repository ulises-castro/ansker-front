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
}

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
    localStorage.user = JSON.stringify(user);
    localStorage.token = token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  hideShareAdvice({ commit }) {
    commit('hideShareAdvice');

    localStorage.hideShareAdvice = 'true';
  }
};

const mutations = {
  authSuccess(state, token, user) {
    state.token = token;
    state.user = user;
  },
  hideShareAdvice(state) {
    state.hideShareAdvice = true;
  },
  // TODO: Check this to thinking in how to do it
  authError() {},
  logout(state) {
    state.authStatus = '';
    state.token = '';
  }
};

const getters = {
  isLogged: state => !!state.token,
  showShareAdvice: state => !state.hideShareAdvice,
}

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state,
  actions,
  mutations,
  getters,
});

export default store;
