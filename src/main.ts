import '@babel/polyfill';
// Import Component hooks before component definitions
import './component-hooks';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify'; // path to vuetify export
import './plugins/vee-validate';
import App from './App.vue';
import router from './router';
import store from '@/store';
import { i18n } from '@/plugins/i18n';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
import VueClipboard from 'vue-clipboards';

const env = process.env.VUE_APP_ENV;
const sentry_key = process.env.VUE_APP_SENTRY_KEY;

if (env === 'production') {
  Vue.config.productionTip = true;
} else {
  Vue.config.productionTip = false;
}

Vue.use(VueClipboard);

new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
