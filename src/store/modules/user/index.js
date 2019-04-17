import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default user = new Vuex.Store({
  namespace: true,
  actions,
  mutations,
  getters,
});
