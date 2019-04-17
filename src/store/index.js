import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userData: localStorage.userData ? JSON.parse(localStorage.userData) || {}
  // userRegionName: localStorage.userRegionName
  //   || "",
  // userRegionCode: localStorage.userRegionCode
  //   || "",
  // userCountrycode: localStorage.userCountryCode
  //   || "",
  // userCountryName: localStorage.userCountryName
  //   || "",
  // userToken: localStorage.userToken
  //   || "",
};

const mutations = {
  SAVE_USER_DATA(state, data) {
    state.userData = data;

    localStorage.userData = JSON.stringify(data);
  }
}

const actions = {
  async SAVE_USER_DATA({ commit }, payloadObj) {
    await commit('SAVE_USER_DATA', payloadObj);
  }
}

const getters = {
  userData() {
    return state.userData;
  }
}

export default new Vuex.Store({
  state
  mutations,
  actions,
  getters,
});
