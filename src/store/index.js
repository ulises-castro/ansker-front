import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userData: localStorage.userData ? JSON.parse(localStorage.userData) : {},
  token: localStorage.token | '',
  activedMenu: 1,
};

const mutations = {
  SAVE_USER_DATA(state, data) {
    state.userData = data;

    localStorage.userData = JSON.stringify(data);
  },
  SAVE_TOKEN(state, data) {
    state.token = data;

    localStorage.token = JSON.stringify(data);
  },
  UPDATE_MENU(state, data) {
    state.token = data;
  }
};

const actions = {
  async saveUserData({ commit }, payloadObj) {
    await commit('SAVE_USER_DATA', payloadObj);
  },
  async saveToken({ commit }, payloadString) {
    await commit('SAVE_TOKEN', payloadString);
  },
  async updateMenu({ commit }, payloadNumber) {
    await commit('UPDATE_MENU', payloadNumber);
  }
};

const getters = {
  userData(state) {
    return state.userData;
  },
  token(state) {
    return state.token;
  },
  activedMenu(state) {
    return state.activedMenu;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
