import Vue from 'vue';
import Axios from 'axios';
import Meta from 'vue-meta';

import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';

Locale.use('en-US', enUS);

// Including vue packages
import { i18n } from './languages';

import App from './App.vue';

import router from '@/router';
import store from '@/store';

// Import global components
import './components';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.use(VueSocketio, io(process.env.VUE_APP_SOCKET));

Vue.use(Meta);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
