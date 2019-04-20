import Vue from 'vue';

// Including vue packages
import Buefy from 'buefy';
import { i18n } from './languages';

// FontAwesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './App.vue';

import router from '@/router';
import store from '@/store';

// Import global components
import './components';

Vue.component('icon', Icon);

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
