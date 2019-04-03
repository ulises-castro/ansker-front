import Vue from 'vue';

// Including vue packages
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

// FontAwesome
import 'vue-awesome/icons'

import App from './App.vue';
import router from './router';
import store from './store';

// Import global components
import './components';

Vue.component('icon', FontAwesome);

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultIconComponent: Vue.component('font-awesome'),
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
