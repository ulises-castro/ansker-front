import Vue from 'vue';
import Axios from 'axios';
import Meta from 'vue-meta';

import VueSocketio from 'vue-socket.io-extended';
import enUS from 'vant/lib/locale/lang/en-US';
import io from 'socket.io-client';
import Croppa from 'vue-croppa';

// Including vue packages
import router from '@/router';
import store from '@/store';

// Import global components
import './components';

import Vant, {
  Image,
  Locale,
  Lazyload,
  Collapse,
  CollapseItem,
} from 'vant';

import 'vant/lib/index.css';
import { i18n } from './languages';
import App from './App.vue';

Vue.use(Vant);
Vue.use(Lazyload, {});
Vue.Use(Image);
Locale.use('en-US', enUS);

Vue.use(Croppa, { componentName: 'image-edit' });
Vue.use(Collapse).use(CollapseItem);

// Setting Vant to english language
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
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
