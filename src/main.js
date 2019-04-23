import Vue from 'vue';

// Including vue packages
import Buefy from 'buefy';
import { i18n } from './languages';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

// FontAwesome
// TODO: Verify if you need this packages cause you already imported fontawesome 
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './App.vue';

import router from '@/router';
import store from '@/store';

// Import global components
import './components';

Vue.component('icon', Icon);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  // defaultIconComponent: "font-awesome-icon",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
