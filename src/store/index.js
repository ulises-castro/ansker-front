import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userData: localStorage.userData ? JSON.parse(localStorage.userData) : {}
};

const mutations = {
  SAVE_USER_DATA(state, data) {
    state.userData = data;

    localStorage.userData = JSON.stringify(data);
  },
  saveData(state, data) {
    state.token = data;

    localStorage.token = JSON.stringify(data);
  }
};

const actions = {
  async SAVE_USER_DATA({ commit }, payloadObj) {
    await commit('SAVE_USER_DATA', payloadObj);
  },
  async SAVE_TOKEN({ commit }, payloadString) {
    await commit('SAVE_TOKEN', payloadString);
  },
};

const getters = {
  userData() {
    return state.userData;
  },
  token() {
    return state.token;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
