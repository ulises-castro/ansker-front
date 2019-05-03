import Vue from 'vue';
import Container from './Container.vue';
import ContainerApp from './ContainerApp.vue';
import HeaderApp from './HeaderApp.vue';
import Spinner from './Spinner.vue';
import SocialShare from './SocialShare.vue';
import Badge from './Badge.vue';
import RequestPermission from './RequestPermission.vue';

Vue.component('container', Container);
Vue.component('request-permission', RequestPermission);
Vue.component('container-app', ContainerApp);
Vue.component('header-app', HeaderApp);
Vue.component('spinner', Spinner);
Vue.component('social-share', SocialShare);
Vue.component('badge', Badge);
